<?php

use App\Models\PropertyCategoryModel;
use App\Models\User;

test('superadmin can view property categories index', function () {
    $user = User::factory()->create(['is_superadmin' => true]);

    $response = $this
        ->actingAs($user)
        ->get(route('superadmin.settings.property.category.index'));

    $response->assertOk();
});

test('superadmin can create a property category', function () {
    $user = User::factory()->create(['is_superadmin' => true]);

    $response = $this
        ->actingAs($user)
        ->post(route('superadmin.settings.property.category.store'), [
            'category_name' => 'Residential',
        ]);

    $response->assertRedirect(route('superadmin.settings.property.category.index'));

    $this->assertDatabaseHas('property_category', [
        'category_name' => 'Residential',
    ]);
});

test('superadmin can update a property category', function () {
    $user = User::factory()->create(['is_superadmin' => true]);
    $category = PropertyCategoryModel::create([
        'category_name' => 'Commercial',
    ]);

    $response = $this
        ->actingAs($user)
        ->put(route('superadmin.settings.property.category.update', ['category' => $category]), [
            'category_name' => 'Industrial',
        ]);

    $response->assertRedirect(route('superadmin.settings.property.category.index'));

    $this->assertDatabaseHas('property_category', [
        'id' => $category->id,
        'category_name' => 'Industrial',
    ]);
});

test('superadmin can delete a property category', function () {
    $user = User::factory()->create(['is_superadmin' => true]);
    $category = PropertyCategoryModel::create([
        'category_name' => 'Land',
    ]);

    $response = $this
        ->actingAs($user)
        ->delete(route('superadmin.settings.property.category.delete', ['category' => $category]));

    $response->assertRedirect(route('superadmin.settings.property.category.index'));

    $this->assertDatabaseMissing('property_category', [
        'id' => $category->id,
    ]);
});
