<?php

namespace App\Http\Controllers\Superadmin\Settings;

use App\Http\Controllers\Controller;
use App\Models\DistrictModel;
use App\Models\StateModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DistrictController extends Controller
{
    public function index(StateModel $state)
    {
        $state->load('districts');

        return Inertia::render('superadmin/settings/district/index', [
            'state' => $state,
            'districts' => $state->districts,
        ]);
    }

    public function create(StateModel $state)
    {
        return Inertia::render('superadmin/settings/district/create', [
            'state' => $state,
        ]);
    }

    public function edit(StateModel $state, DistrictModel $district)
    {
        if ($district->state_id !== $state->id) {
            abort(404);
        }

        return Inertia::render('superadmin/settings/district/edit', [
            'state' => $state,
            'district' => $district,
        ]);
    }

    public function store(StateModel $state, Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'district_code' => 'required|string|max:255',
        ]);

        $state->districts()->create($data);

        return redirect()
            ->route('superadmin.settings.district.index', $state->id)
            ->with('success', 'District created successfully');
    }

    public function update(StateModel $state, DistrictModel $district, Request $request)
    {
        if ($district->state_id !== $state->id) {
            abort(404);
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'district_code' => 'required|string|max:255',
        ]);

        $district->update($data);

        return redirect()
            ->route('superadmin.settings.district.index', $state->id)
            ->with('success', 'District updated successfully');
    }

    public function destroy(StateModel $state, DistrictModel $district)
    {
        if ($district->state_id !== $state->id) {
            abort(404);
        }

        $district->delete();

        return redirect()->route('superadmin.settings.district.index', $state->id);
    }
}
