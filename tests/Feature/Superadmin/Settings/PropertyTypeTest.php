<?php

use App\Models\PropertyCategoryModel;
use App\Models\PropertyTypeModel;
use App\Models\User;
use Illuminate\Support\Facades\DB;

test('superadmin can view property types index', function () {
    $user = User::factory()->create(['is_superadmin' => true]);
    $category = PropertyCategoryModel::create([
        'category_name' => 'Residential',
    ]);

    $response = $this
        ->actingAs($user)
        ->get(route('superadmin.settings.property.type.view', ['category' => $category]));

    $response->assertOk();
});

test('superadmin can create a property type', function () {
    $user = User::factory()->create(['is_superadmin' => true]);
    $category = PropertyCategoryModel::create([
        'category_name' => 'Commercial',
    ]);

    $response = $this
        ->actingAs($user)
        ->post(route('superadmin.settings.property.type.store', ['category' => $category]), [
            'type_name' => 'Shop / Retail',
        ]);

    $response->assertRedirect(route('superadmin.settings.property.type.view', ['category' => $category]));

    $this->assertDatabaseHas('property_type', [
        'type_name' => 'Shop / Retail',
        'property_category_id' => $category->id,
    ]);
});

test('superadmin can edit a property type', function () {
    $user = User::factory()->create(['is_superadmin' => true]);
    $category = PropertyCategoryModel::create([
        'category_name' => 'Industrial',
    ]);

    DB::table('property_type')->insert([
        'type_name' => 'Warehouse',
        'type_slug' => 'warehouse',
        'property_category_id' => $category->id,
    ]);

    $type = PropertyTypeModel::where('type_slug', 'warehouse')->firstOrFail();

    $response = $this
        ->actingAs($user)
        ->get(route('superadmin.settings.property.type.edit', [
            'category' => $category,
            'type' => $type,
        ]));

    $response->assertOk();
});

test('superadmin can update a property type', function () {
    $user = User::factory()->create(['is_superadmin' => true]);
    $category = PropertyCategoryModel::create([
        'category_name' => 'Land',
    ]);

    DB::table('property_type')->insert([
        'type_name' => 'Agricultural Land',
        'type_slug' => 'agriculturalland',
        'property_category_id' => $category->id,
    ]);

    $type = PropertyTypeModel::where('type_slug', 'agriculturalland')->firstOrFail();

    $response = $this
        ->actingAs($user)
        ->put(route('superadmin.settings.property.type.update', [
            'category' => $category,
            'type' => $type,
        ]), [
            'type_name' => 'Development Land',
        ]);

    $response->assertRedirect(route('superadmin.settings.property.type.view', ['category' => $category]));

    $this->assertDatabaseHas('property_type', [
        'id' => $type->id,
        'type_name' => 'Development Land',
    ]);
});

test('superadmin can delete a property type', function () {
    $user = User::factory()->create(['is_superadmin' => true]);
    $category = PropertyCategoryModel::create([
        'category_name' => 'Residential',
    ]);

    DB::table('property_type')->insert([
        'type_name' => 'Apartment / Condo',
        'type_slug' => 'apartmentcondo',
        'property_category_id' => $category->id,
    ]);

    $type = PropertyTypeModel::where('type_slug', 'apartmentcondo')->firstOrFail();

    $response = $this
        ->actingAs($user)
        ->delete(route('superadmin.settings.property.type.delete', [
            'category' => $category,
            'type' => $type,
        ]));

    $response->assertRedirect(route('superadmin.settings.property.type.view', ['category' => $category]));

    $this->assertDatabaseMissing('property_type', [
        'id' => $type->id,
    ]);
});
