<?php

namespace App\Http\Controllers\Admin;

use App\AgencyMemberRole;
use App\Http\Controllers\Controller;
use App\Models\AgencyMemberModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminMemberController extends Controller
{

    public function slugify($value)
    {
        $value = strtolower($value);
        $value = preg_replace('/[^a-z0-9]+/', '', $value) ?? '';

        return $value;
    }

    public function index(Request $request)
    {

        // dapatkan agency id dari agency member yang memiliki role agent
        $agencyId = AgencyMemberModel::where('user_id', $request->user()->id)
            ->where('role', AgencyMemberRole::Admin)
            ->value('agency_id');

        $agents = AgencyMemberModel::with('user')
            ->where('agency_id', $agencyId)
            ->whereIn('role', [AgencyMemberRole::Agent, AgencyMemberRole::Staff])
            ->get();

        // dd($agents);

        return Inertia::render('admin/members/index', [
            'agents' => $agents
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('admin/members/create', []);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:agency_members,agent_slug'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'ren_no' => ['required', 'string', 'max:255', 'unique:agency_members'],
            'role' => ['required', 'string', 'max:255'],
            'is_active' => ['required', 'boolean'],
        ]);

        // masukkan data dalam user table dulu
        // dd($data);

        $agencyId = AgencyMemberModel::where('user_id', $request->user()->id)
            ->where('role', AgencyMemberRole::Admin)
            ->value('agency_id');

        // create agency member
        $user = User::updateOrCreate([
            'email' => $data['email'],
            'name' => $data['name'],
            'password' => Hash::make($data['password']),
            'is_superadmin' => false
        ]);

        AgencyMemberModel::create([
            'agency_id' => $agencyId,
            'user_id' => $user->id,
            'ren_no' => $data['ren_no'],
            'name' => $data['name'],
            'agent_slug' => $this->slugify($data['slug']),
            'role' => AgencyMemberRole::Agent,
            'is_active' => $data['is_active'],
        ]);

        return redirect()->route('admin.members.index')->with('success', 'Agent added successfully');
    }

    public function edit(Request $request, $id)
    {
        $agencyId = AgencyMemberModel::where('user_id', $request->user()->id)->where('role', AgencyMemberRole::Admin)->value('agency_id');
        $agencyMemberToEdit = AgencyMemberModel::with('user:id,name,email')->where('agency_id', $agencyId)->findOrFail($id);

        return Inertia::render('admin/members/edit', [
            'member' => $agencyMemberToEdit
        ]);
    }

    public function update(Request $request, AgencyMemberModel $member)
    {

        $agencyId = AgencyMemberModel::where('user_id', $request->user()->id)
            ->where('role', AgencyMemberRole::Admin)
            ->value('agency_id');

        abort_unless($agencyId && $member->agency_id === $agencyId, 403);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:agency_members,agent_slug,' . $member->id],
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'], // only update password if it is not empty
            'ren_no' => ['nullable', 'string', 'max:255', Rule::unique('agency_members')->ignore($member->id)],
            'role' => ['required', 'string', 'max:255'],
            'is_active' => ['required', 'boolean'],
        ]);

        if ($user = $member->user) {
            $user->name = $data['name'];
            $user->email = $data['email'];
            if (!empty($data['password'])) {
                $user->password = Hash::make($data['password']);
            }
            $user->save();
        }

        // check ren no exist

        $member->update([
            'name' => $data['name'],
            'agent_slug' => $this->slugify($data['slug']),
            'ren_no' => $data['ren_no'],
            'role' => AgencyMemberRole::Agent,
            'is_active' => $data['is_active'],
        ]);

        return redirect()->route('admin.members.index')->with('success', 'Agent updated successfully');
    }

    public function delete(Request $request, AgencyMemberModel $member)
    {
        $member->delete();

        return redirect()->route('admin.members.index')->with('success', 'Agent deleted successfully');
    }
}
