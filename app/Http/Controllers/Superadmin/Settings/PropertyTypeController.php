<?php

namespace App\Http\Controllers\Superadmin\Settings;

use App\Http\Controllers\Controller;
use App\Models\PropertyCategoryModel;
use App\Models\PropertyTypeModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyTypeController extends Controller
{
    public function slugify($value)
    {
        $value = strtolower($value);
        $value = preg_replace('/[^a-z0-9]+/', '', $value) ?? '';

        return $value;
    }

    private function uniqueSlug(string $base, ?int $ignoreId = null): string
    {
        $slug = $this->slugify($base);
        $counter = 1;

        $query = PropertyTypeModel::query();
        if ($ignoreId) {
            $query->where('id', '!=', $ignoreId);
        }

        $candidate = $slug;
        while ($query->where('type_slug', $candidate)->exists()) {
            $candidate = $slug . $counter;
            $counter++;
        }

        return $candidate;
    }
    public function index(PropertyCategoryModel $category)
    {
        // get all property types for the category
        $types = $category->propertyType()->get();
        // dd($types);
        return Inertia::render('superadmin/settings/property/type/index', [
            'category' => $category,
            'types' => $types,
        ]);
    }

    public function create(PropertyCategoryModel $category)
    {
        return Inertia::render('superadmin/settings/property/type/create', [
            'category' => $category,
        ]);
    }

    public function store(PropertyCategoryModel $category, Request $request)
    {

        $data = $request->validate([
            'type_name' => ['required', 'string', 'max:255'],
        ]);

        $type_name = trim($data['type_name']);

        PropertyTypeModel::create([
            'type_name' => $type_name,
            'property_category_id' => $category->id,
            'type_slug' => $this->uniqueSlug($type_name),
        ]);

        return redirect()->route('superadmin.settings.property.type.view', ['category' => $category]);
    }

    public function edit(PropertyCategoryModel $category, PropertyTypeModel $type)
    {
        return Inertia::render('superadmin/settings/property/type/edit', [
            'category' => $category,
            'type' => $type,
        ]);
    }

    public function update(PropertyCategoryModel $category, PropertyTypeModel $type, Request $request)
    {
        $data = $request->validate([
            'type_name' => ['required', 'string', 'max:255'],
        ]);

        $type_name = trim($data['type_name']);

        $type->update([
            'type_name' => $type_name,
            'type_slug' => $this->uniqueSlug($type_name, $type->id),
        ]);

        return redirect()->route('superadmin.settings.property.type.view', ['category' => $category])->with('success', 'Property type updated successfully');
    }

    public function delete(PropertyCategoryModel $category, PropertyTypeModel $type)
    {
        $type->delete();

        return redirect()->route('superadmin.settings.property.type.view', ['category' => $category])->with('success', 'Property type deleted successfully');
    }
}
