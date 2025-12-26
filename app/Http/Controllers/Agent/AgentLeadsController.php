<?php

namespace App\Http\Controllers\Agent;

use App\AgencyMemberRole;
use App\Http\Controllers\Controller;
use App\Models\AgencyMemberModel;
use App\Models\LeadsModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgentLeadsController extends Controller
{
    public function index(Request $request)
    {

        $agencyId = AgencyMemberModel::where('user_id', $request->user()->id)
            ->where('role', AgencyMemberRole::Agent)
            ->value('agency_id');

        $leads = $agencyId ? LeadsModel::with('agent', 'property')->where('agency_id', $agencyId)->where('assigned_agent_id', $request->user()->id)->get() : collect();

        return Inertia::render('agent/leads/index', [
            'leads' => $leads
        ]);
    }
}
