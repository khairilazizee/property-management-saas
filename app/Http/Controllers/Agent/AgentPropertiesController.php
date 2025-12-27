<?php

namespace App\Http\Controllers\Agent;

use App\AgencyMemberRole;
use App\Http\Controllers\Controller;
use App\Models\AgencyMemberModel;
use App\Models\PropertiesModel;
use App\Models\PropertyCategoryModel;
use App\Models\PropertyImagesModel;
use App\Models\PropertyTypeModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AgentPropertiesController extends Controller
{
    public function index(Request $request)
    {
        $agencyId = AgencyMemberModel::where('user_id', $request->user()->id)
            ->where('role', AgencyMemberRole::Agent)
            ->value('agency_id');

        $properties = $agencyId
            ? PropertiesModel::query()
            ->where('agency_id', $agencyId)
            ->where('agent_id', $request->user()->id)
            ->with(['propertyCategory', 'propertyType'])
            ->get()
            : collect();

        return Inertia::render('agent/properties/index', [
            'properties' => $properties,
        ]);
    }

    public function create(Request $request)
    {

        $propertycategory = PropertyCategoryModel::all();
        $propertytype = PropertyTypeModel::all();

        return Inertia::render('agent/properties/create', [
            'propertycategory' => $propertycategory,
            'propertytype' => $propertytype,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'property_name' => 'required|string|max:255',
            'property_price' => 'required|numeric|min:0',
            'property_price_type' => 'nullable|string|max:255',
            'property_description' => 'nullable|string',
            'property_category' => 'required|integer|exists:property_category,id',
            'property_type' => 'required|integer|exists:property_type,id',
            'advertisement_type' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:255',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'sqft' => 'nullable|integer|min:0',
            'parking' => 'nullable|integer|min:0',
            'property_image' => 'nullable|array',
            'property_image.*' => 'image|max:5120',
        ]);

        $agencyId = AgencyMemberModel::where('user_id', $request->user()->id)
            ->where('role', AgencyMemberRole::Agent)
            ->value('agency_id');

        if (!$agencyId) {
            abort(403);
        }

        $property = PropertiesModel::create([
            'agency_id' => $agencyId,
            'agent_id' => $request->user()->id,
            'title' => $data['property_name'],
            'price' => (int) $data['property_price'],
            'price_type' => $data['property_price_type'] ?? '',
            'description' => $data['property_description'] ?? null,
            'property_category_id' => $data['property_category'],
            'property_type_id' => $data['property_type'],
            'advertisement_type' => $data['advertisement_type'] ?? null,
            'status' => $data['status'] ?? null,
            'bedrooms' => $data['bedrooms'] ?? 0,
            'bathrooms' => $data['bathrooms'] ?? 0,
            'sqft' => $data['sqft'] ?? 0,
            'parking' => $data['parking'] ?? 0,
        ]);

        $images = $request->file('property_image', []);
        foreach ($images as $image) {
            $path = $image->store('property_images', 'public');
            PropertyImagesModel::create([
                'property_id' => $property->id,
                'image_url' => $path,
                'image_name' => $image->getClientOriginalName(),
            ]);
        }

        return redirect()
            ->route('agent.properties.index')
            ->with('success', 'Property created successfully');
    }

    public function edit(Request $request, PropertiesModel $property)
    {

        if ($property->agent_id !== $request->user()->id) {
            abort(403);
        }

        $propertyCategory = PropertyCategoryModel::all();
        $propertyType = PropertyTypeModel::all();
        $images = PropertyImagesModel::where('property_id', $property->id)->get();

        return Inertia::render('agent/properties/edit', [
            'property' => $property,
            'propertycategory' => $propertyCategory,
            'propertytype' => $propertyType,
            'propertyimages' => $images
        ]);
    }

    public function update(Request $request, PropertiesModel $property)
    {
        if ($property->agent_id !== $request->user()->id) {
            abort(403);
        }

        $data = $request->validate([
            'property_name' => 'required|string|max:255',
            'property_price' => 'required|numeric|min:0',
            'property_price_type' => 'nullable|string|max:255',
            'property_description' => 'nullable|string',
            'property_category' => 'required|integer|exists:property_category,id',
            'property_type' => 'required|integer|exists:property_type,id',
            'advertisement_type' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:255',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'sqft' => 'nullable|integer|min:0',
            'parking' => 'nullable|integer|min:0',
            'property_image' => 'nullable|array',
            'property_image.*' => 'image|max:5120',
        ]);

        $agencyId = AgencyMemberModel::where('user_id', $request->user()->id)
            ->where('role', AgencyMemberRole::Agent)
            ->value('agency_id');

        $property->update([
            'agency_id' => $agencyId,
            'agent_id' => $request->user()->id,
            'title' => $data['property_name'],
            'price' => (int) $data['property_price'],
            'price_type' => $data['property_price_type'] ?? '',
            'description' => $data['property_description'] ?? null,
            'property_category_id' => $data['property_category'],
            'property_type_id' => $data['property_type'],
            'advertisement_type' => $data['advertisement_type'] ?? null,
            'status' => $data['status'] ?? null,
            'bedrooms' => $data['bedrooms'] ?? 0,
            'bathrooms' => $data['bathrooms'] ?? 0,
            'sqft' => $data['sqft'] ?? 0,
            'parking' => $data['parking'] ?? 0,
        ]);

        if ($request->hasFile('property_image')) {
            $existingImages = PropertyImagesModel::where('property_id', $property->id)->get();
            foreach ($existingImages as $image) {
                if (!empty($image->image_url)) {
                    Storage::disk('public')->delete($image->image_url);
                }
                $image->delete();
            }
        }

        $images = $request->file('property_image', []);
        foreach ($images as $image) {
            $path = $image->store('property_images', 'public');
            PropertyImagesModel::create([
                'property_id' => $property->id,
                'image_url' => $path,
                'image_name' => $image->getClientOriginalName(),
            ]);
        }
        //
        return redirect()->route('agent.properties.index')->with('success', 'Property updated successfully');
    }
}
