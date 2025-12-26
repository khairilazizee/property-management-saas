<?php

namespace App\Http\Controllers\Superadmin\Settings;

use App\Http\Controllers\Controller;
use App\Models\PropertyCategoryModel;
use App\Models\PropertyTypeModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyCategoryController extends Controller
{
    public function index()
    {
        $propertyCategories = PropertyCategoryModel::all();
        return Inertia::render('superadmin/settings/property/category/index', [
            'categories' => $propertyCategories
        ]);
    }

    public function create()
    {
        return Inertia::render('superadmin/settings/property/category/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category_name' => ['required', 'string', 'max:255'],
        ]);

        PropertyCategoryModel::create([
            'category_name' => $data['category_name'],
        ]);

        return redirect()->route('superadmin.settings.property.category.index')->with('success', 'Property category added successfully');
    }

    public function edit(string $id)
    {
        $propertyCategory = PropertyCategoryModel::findOrFail($id);
        return Inertia::render('superadmin/settings/property/category/edit', [
            'category' => $propertyCategory
        ]);
    }

    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'category_name' => ['required', 'string', 'max:255'],
        ]);

        $propertyCategory = PropertyCategoryModel::findOrFail($id);

        $propertyCategory->update([
            'category_name' => $data['category_name'],
        ]);

        return redirect()->route('superadmin.settings.property.category.index')->with('success', 'Property category updated successfully');
    }

    public function delete(string $id)
    {
        $propertyCategory = PropertyCategoryModel::findOrFail($id);

        $propertyCategory->delete();

        return redirect()->route('superadmin.settings.property.category.index')->with('success', 'Property category deleted successfully');
    }
}
