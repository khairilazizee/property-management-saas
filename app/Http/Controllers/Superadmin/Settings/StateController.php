<?php

namespace App\Http\Controllers\Superadmin\Settings;

use App\Http\Controllers\Controller;
use App\Models\StateModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('superadmin/settings/state/index', [
            'states' => StateModel::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('superadmin/settings/state/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'state_code' => 'required|string|max:255',
            'state_abbr' => 'required|string|max:255',
        ]);

        StateModel::create($data);

        return redirect()
            ->route('superadmin.settings.state.index')
            ->with('success', 'State created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('superadmin/settings/state/edit', [
            'state' => StateModel::findOrFail($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'state_code' => 'required|string|max:255',
            'state_abbr' => 'required|string|max:255',
        ]);

        $state = StateModel::findOrFail($id);
        $state->update($data);

        return redirect()
            ->route('superadmin.settings.state.index')
            ->with('success', 'State updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $state = StateModel::findOrFail($id);
        $state->delete();

        return redirect()->route('superadmin.settings.state.index');
    }
}
