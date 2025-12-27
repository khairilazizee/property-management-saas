<?php

namespace App\Http\Controllers\Admin;

use App\AgencyMemberRole;
use App\Http\Controllers\Controller;
use App\Models\AgencyMemberModel;
use App\Models\PropertiesModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPropertiesController extends Controller
{
    public function index(Request $request)
    {

        $agencyId = AgencyMemberModel::where('user_id', $request->user()->id)
            ->where('role', AgencyMemberRole::Admin)
            ->value('agency_id');

        $properties = $agencyId
            ? PropertiesModel::query()
            ->where('agency_id', $agencyId)
            ->where('agent_id', $request->user()->id)
            ->with(['propertyCategory', 'propertyType'])
            ->get()
            : collect();

        return Inertia::render('admin/properties/index', [
            'properties' => $properties,
        ]);
    }
}
