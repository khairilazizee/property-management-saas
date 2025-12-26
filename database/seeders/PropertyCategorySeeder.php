<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PropertyCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('property_category')->delete();

        DB::table('property_category')->insert([
            ['category_name' => 'Residential'],
            ['category_name' => 'Commercial'],
            ['category_name' => 'Industrial'],
            ['category_name' => 'Land'],
        ]);
    }
}
