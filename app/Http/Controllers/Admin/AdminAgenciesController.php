<?php

namespace App\Http\Controllers\Admin;

use App\AgencyMemberRole;
use App\Http\Controllers\Controller;
use App\Models\AgencyMemberModel;
use App\Models\AgencyModel;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminAgenciesController extends Controller
{
    public function index(Request $request)
    {
        $membership = AgencyMemberModel::where('user_id', $request->user()->id)
            ->with('agency')
            ->whereIn('role', [AgencyMemberRole::Admin, AgencyMemberRole::Agent])
            ->firstOrFail();

        return Inertia::render('admin/agency/index', [
            'agency' => $membership->agency,
        ]);
    }

    public function update(Request $request)
    {
        $membership = AgencyMemberModel::where('user_id', $request->user()->id)
            ->with('agency')
            ->whereIn('role', [AgencyMemberRole::Admin, AgencyMemberRole::Agent])
            ->firstOrFail();

        /** @var AgencyModel $agency */
        $agency = $membership->agency;

        $data = $request->validate([
            'agency_name' => ['required', 'string', 'max:255'],
            'agency_slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('agencies', 'slug')->ignore($agency->id),
            ],
        ]);

        $agency->update([
            'name' => $data['agency_name'],
            'slug' => $data['agency_slug'],
        ]);

        return back()->with('success', 'Agency updated successfully');
    }
}
