<?php

namespace App\Http\Controllers;

use App\AgencyMemberRole;
use App\Models\AgencyMemberModel;
use App\Models\LeadsModel;
use App\Models\PropertiesModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // check role of user, if user is superadmin, call superadmin dashboard
        $user = $request->user();
        $member = $user?->agencyMember;

        if ($user?->is_superadmin && !$member) {
            return Inertia::render('superadmin/dashboard');
        }

        if (!$user?->is_superadmin && $member) {
            if ($member->role === AgencyMemberRole::Agent->value) {
                $stats = [
                    [
                        'label' => 'My listings',
                        'value' => PropertiesModel::where('agent_id', $user->id)->count(),
                        'trend' => 'Total listings',
                    ],
                    [
                        'label' => 'My leads',
                        'value' => LeadsModel::where('assigned_agent_id', $user->id)->count(),
                        'trend' => 'Total leads',
                    ],
                    [
                        'label' => 'Upcoming follow-ups',
                        'value' => LeadsModel::where('assigned_agent_id', $user->id)
                            ->whereNotNull('next_follow_up_at')
                            ->count(),
                        'trend' => 'Scheduled',
                    ],
                ];

                $followUps = LeadsModel::with('property')
                    ->where('assigned_agent_id', $user->id)
                    ->whereNotNull('next_follow_up_at')
                    ->orderBy('next_follow_up_at')
                    ->limit(5)
                    ->get()
                    ->map(function ($lead) {
                        return [
                            'id' => $lead->id,
                            'property' => $lead->property?->title ?? 'General inquiry',
                            'client' => $lead->name,
                            'time' => $lead->next_follow_up_at,
                            'status' => $lead->status ?? 'New',
                        ];
                    });

                return Inertia::render('agent/dashboard', [
                    'stats' => $stats,
                    'followUps' => $followUps,
                ]);
            }

            if ($member->role === AgencyMemberRole::Admin->value) {
                $agencyId = $member->agency_id;

                $stats = [
                    [
                        'label' => 'Active listings',
                        'value' => PropertiesModel::where('agency_id', $agencyId)->count(),
                        'trend' => 'Total listings',
                    ],
                    [
                        'label' => 'Active agents',
                        'value' => AgencyMemberModel::where('agency_id', $agencyId)
                            ->where('role', AgencyMemberRole::Agent)
                            ->where('is_active', true)
                            ->count(),
                        'trend' => 'Available agents',
                    ],
                    [
                        'label' => 'New leads',
                        'value' => LeadsModel::where('agency_id', $agencyId)
                            ->where('status', 'New')
                            ->count(),
                        'trend' => 'Pipeline today',
                    ],
                    [
                        'label' => 'Upcoming follow-ups',
                        'value' => LeadsModel::where('agency_id', $agencyId)
                            ->whereNotNull('next_follow_up_at')
                            ->count(),
                        'trend' => 'Scheduled',
                    ],
                ];

                $latestListings = PropertiesModel::with('agent')
                    ->where('agency_id', $agencyId)
                    ->latest()
                    ->limit(5)
                    ->get()
                    ->map(function ($property) {
                        return [
                            'id' => $property->id,
                            'name' => $property->title,
                            'status' => $property->status ?? 'Active',
                            'price' => $property->price,
                            'priceType' => $property->price_type,
                            'agent' => $property->agent?->name,
                        ];
                    });

                return Inertia::render('admin/dashboard', [
                    'stats' => $stats,
                    'listings' => $latestListings,
                ]);
            }
        }

        return redirect()->route('login')->with('error', 'You are not authorized to access this page');
    }
}
