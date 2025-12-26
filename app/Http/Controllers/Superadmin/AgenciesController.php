<?php

namespace App\Http\Controllers\Superadmin;

use App\AgencyMemberRole;
use App\Http\Controllers\Controller;
use App\Models\AgencyMemberModel;
use App\Models\AgencyModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AgenciesController extends Controller
{
    public function index()
    {
        $agencies = AgencyModel::all();
        return Inertia::render('superadmin/agencies/index', [
            'agencies' => $agencies
        ]);
    }

    public function create()
    {
        return Inertia::render('superadmin/agencies/create');
    }

    public function store(Request $request)
    {

        $data = $request->validate([
            'agency_name' => 'required|string|max:255',
            'agency_slug' => 'required|string|max:255|unique:agencies,slug',
            'admin_name' => 'required|string|max:255',
            'admin_email' => 'required|string|email|max:255',
            'admin_password' => 'required|string|min:8|max:255|confirmed',
        ]);

        $agency = AgencyModel::create([
            'name' => $data['agency_name'],
            'slug' => $data['agency_slug'],
            'is_active' => true
        ]);

        // create user for agency admin
        $user = User::create([
            'name' => $data['admin_name'],
            'email' => $data['admin_email'],
            'password' => Hash::make($data['admin_password']),
            'is_superadmin' => false
        ]);

        // create agency member
        $member = AgencyMemberModel::create([
            'agency_id' => $agency->id,
            'user_id' => $user->id,
            'name' => $data['admin_name'],
            'role' => AgencyMemberRole::Admin,
            'ren_no' => 'X',
            'is_active' => true
        ]);


        return redirect()->route('superadmin.agencies.index')->with('success', 'Agency created successfully');
    }

    public function edit(AgencyModel $agency)
    {
        $agency->load('adminMember.user');

        return Inertia::render('superadmin/agencies/edit', [
            'agency' => $agency
        ]);
    }

    public function update(Request $request, AgencyModel $agency)
    {
        $agency->load('adminMember.user');

        $data = $request->validate([
            'agency_name' => 'required|string|max:255',
            'admin_name' => 'required|string|max:255',
            'admin_email' => 'required|string|email|max:255',
            'admin_password' => 'nullable|string|min:8|max:255|confirmed',
        ]);

        // update agency information
        $agency->update([
            'name' => $data['agency_name'],
        ]);


        if ($admin = $agency->adminMember) {
            $admin->update([
                'name' => $data['admin_name'],
            ]);

            if ($user = $admin->user) {
                $user->name = $data['admin_name'];
                $user->email = $data['admin_email'];
                if (!empty($data['admin_password'])) {
                    $user->password = Hash::make($data['admin_password']);
                }
            }
            $user->save();
        }

        return redirect()->route('superadmin.agencies.index')->with('success', 'Agency information updated successfully');
    }

    public function destroy(AgencyModel $agency)
    {
        DB::transaction(function () use ($agency) {
            $agency->members()->with('user')->get()->each(function ($member) {
                if ($member->user && !$member->user->is_superadmin) {
                    $member->user->delete();
                }
            });
            $agency->delete();
        });

        // $agency->adminMember->user()->delete();
        // do i need to delete the user too?

        return redirect()->route('superadmin.agencies.index');
    }
}
