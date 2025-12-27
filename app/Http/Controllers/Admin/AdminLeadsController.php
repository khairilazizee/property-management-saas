<?php

namespace App\Http\Controllers\Admin;

use App\AgencyMemberRole;
use App\Http\Controllers\Controller;
use App\Models\AgencyMemberModel;
use App\Models\LeadsModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminLeadsController extends Controller
{
    public function index(Request $request)
    {
        $agencyId = AgencyMemberModel::where('user_id', $request->user()->id)->where('role', AgencyMemberRole::Admin)->value('agency_id');

        $leads = LeadsModel::with('agent', 'property')->where('agency_id', $agencyId)->get();

        return Inertia::render('admin/leads/index', [
            'leads' => $leads,
        ]);
    }
}
