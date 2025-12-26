<?php

namespace Database\Seeders;

use App\Models\PropertyCategoryModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PropertyTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('property_type')->delete();

        $slugify = function (string $value): string {
            $value = strtolower($value);
            $value = preg_replace('/[^a-z0-9]+/', '', $value) ?? '';
            return trim($value);
        };

        $categories = PropertyCategoryModel::whereIn('category_name', [
            'Residential',
            'Commercial',
            'Industrial',
            'Land',
        ])->pluck('id', 'category_name');

        $types = [
            ['type_name' => 'Apartment / Condo', 'property_category_id' => $categories['Residential'] ?? null],
            ['type_name' => 'Terrace / Townhouse', 'property_category_id' => $categories['Residential'] ?? null],
            ['type_name' => 'Semi-Detached', 'property_category_id' => $categories['Residential'] ?? null],
            ['type_name' => 'Bungalow', 'property_category_id' => $categories['Residential'] ?? null],

            ['type_name' => 'Shop / Retail', 'property_category_id' => $categories['Commercial'] ?? null],
            ['type_name' => 'Office', 'property_category_id' => $categories['Commercial'] ?? null],
            ['type_name' => 'Soho / Suite', 'property_category_id' => $categories['Commercial'] ?? null],

            ['type_name' => 'Factory', 'property_category_id' => $categories['Industrial'] ?? null],
            ['type_name' => 'Warehouse', 'property_category_id' => $categories['Industrial'] ?? null],

            ['type_name' => 'Agricultural Land', 'property_category_id' => $categories['Land'] ?? null],
            ['type_name' => 'Development Land', 'property_category_id' => $categories['Land'] ?? null],
        ];

        // Filter out any entries missing a category id to avoid foreign key issues
        $types = array_values(array_filter($types, fn($type) => $type['property_category_id']));

        $types = array_map(function (array $type) use ($slugify) {
            $type['type_slug'] = $slugify($type['type_name']);
            return $type;
        }, $types);

        DB::table('property_type')->insert($types);
    }
}
