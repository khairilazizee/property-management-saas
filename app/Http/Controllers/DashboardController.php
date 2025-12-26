<?php

namespace App\Http\Controllers;

use App\AgencyMemberRole;
use App\Models\AgencyMemberModel;
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

        if ($user?->is_superadmin && $member) {
            if ($member->role === AgencyMemberRole::Agent) {
                return Inertia::render('agent/dashboard');
            }

            if ($member->role === AgencyMemberRole::Admin) {
                return Inertia::render('admin/dashboard');
            }
        }

        return redirect()->route('login')->with('error', 'You are not authorized to access this page');
    }
}
