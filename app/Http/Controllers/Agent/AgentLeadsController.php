<?php

namespace App\Http\Controllers\Agent;

use App\AgencyMemberRole;
use App\Http\Controllers\Controller;
use App\Models\AgencyMemberModel;
use App\Models\LeadsModel;
use App\Models\PropertiesModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgentLeadsController extends Controller
{
    public function index(Request $request)
    {
        $agencyId = AgencyMemberModel::where('user_id', $request->user()->id)
            ->where('role', AgencyMemberRole::Agent)
            ->value('agency_id');

        $leads = $agencyId
            ? LeadsModel::with('agent', 'property')
            ->where('agency_id', $agencyId)
            ->where('assigned_agent_id', $request->user()->id)
            ->get()
            : collect();

        return Inertia::render('agent/leads/index', [
            'leads' => $leads,
        ]);
    }

    public function create(Request $request)
    {
        $agencyId = AgencyMemberModel::where('user_id', $request->user()->id)
            ->where('role', AgencyMemberRole::Agent)
            ->value('agency_id');

        if (!$agencyId) {
            abort(403);
        }

        $properties = PropertiesModel::query()
            ->where('agency_id', $agencyId)
            ->where('agent_id', $request->user()->id)
            ->select('id', 'title')
            ->orderBy('title')
            ->get();

        return Inertia::render('agent/leads/create', [
            'properties' => $properties,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'preferred_location' => 'nullable|string|max:255',
            'property_id' => 'nullable|integer|exists:properties,id',
            'source' => 'nullable|string|max:50',
            'status' => 'nullable|string|max:50',
            'message' => 'nullable|string',
        ]);

        $agencyId = AgencyMemberModel::where('user_id', $request->user()->id)
            ->where('role', AgencyMemberRole::Agent)
            ->value('agency_id');

        if (!$agencyId) {
            abort(403);
        }

        LeadsModel::create([
            'agency_id' => $agencyId,
            'assigned_agent_id' => $request->user()->id,
            'property_id' => $data['property_id'] ?? null,
            'name' => $data['name'],
            'email' => $data['email'] ?? null,
            'phone' => $data['phone'] ?? null,
            'preferred_location' => $data['preferred_location'] ?? null,
            'message' => $data['message'] ?? null,
            'source' => $data['source'] ?? 'manual',
            'status' => $data['status'] ?? 'new',
        ]);

        return redirect()
            ->route('agent.leads.index')
            ->with('success', 'Lead added successfully');
    }

    public function edit(Request $request, LeadsModel $lead)
    {
        $agencyId = AgencyMemberModel::where('user_id', $request->user()->id)
            ->where('role', AgencyMemberRole::Agent)
            ->value('agency_id');

        if (
            !$agencyId ||
            $lead->agency_id !== $agencyId ||
            $lead->assigned_agent_id !== $request->user()->id
        ) {
            abort(403);
        }

        $properties = PropertiesModel::query()
            ->where('agency_id', $agencyId)
            ->where('agent_id', $request->user()->id)
            ->select('id', 'title')
            ->orderBy('title')
            ->get();

        return Inertia::render('agent/leads/edit', [
            'lead' => $lead,
            'properties' => $properties,
        ]);
    }

    public function update(Request $request, LeadsModel $lead)
    {
        $agencyId = AgencyMemberModel::where('user_id', $request->user()->id)
            ->where('role', AgencyMemberRole::Agent)
            ->value('agency_id');

        if (
            !$agencyId ||
            $lead->agency_id !== $agencyId ||
            $lead->assigned_agent_id !== $request->user()->id
        ) {
            abort(403);
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'preferred_location' => 'nullable|string|max:255',
            'property_id' => 'nullable|integer|exists:properties,id',
            'source' => 'nullable|string|max:50',
            'status' => 'nullable|string|max:50',
            'message' => 'nullable|string',
        ]);

        $lead->update([
            'property_id' => $data['property_id'] ?? null,
            'name' => $data['name'],
            'email' => $data['email'] ?? null,
            'phone' => $data['phone'] ?? null,
            'preferred_location' => $data['preferred_location'] ?? null,
            'message' => $data['message'] ?? null,
            'source' => $data['source'] ?? $lead->source,
            'status' => $data['status'] ?? $lead->status,
        ]);

        return redirect()
            ->route('agent.leads.index')
            ->with('success', 'Lead updated successfully');
    }

    public function destroy(Request $request, LeadsModel $lead)
    {
        $agencyId = AgencyMemberModel::where('user_id', $request->user()->id)
            ->where('role', AgencyMemberRole::Agent)
            ->value('agency_id');

        if (
            !$agencyId ||
            $lead->agency_id !== $agencyId ||
            $lead->assigned_agent_id !== $request->user()->id
        ) {
            abort(403);
        }

        $lead->delete();

        return redirect()
            ->route('agent.leads.index')
            ->with('success', 'Lead deleted successfully');
    }
}
