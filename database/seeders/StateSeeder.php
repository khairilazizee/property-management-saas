<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('states')->delete();
        DB::table('states')->insert([
            [
                'name' => 'Johor',
                'state_code' => '01',
                'state_abbr' => 'JHR'
            ],
            [
                'name' => 'Kedah',
                'state_code' => '02',
                'state_abbr' => 'KDH'
            ],
            [
                'name' => 'Kelantan',
                'state_code' => '03',
                'state_abbr' => 'KTN'
            ],
            [
                'name' => 'Melaka',
                'state_code' => '04',
                'state_abbr' => 'MLK'
            ],
            [
                'name' => 'Negeri Sembilan',
                'state_code' => '05',
                'state_abbr' => 'NSN'
            ],
            [
                'name' => 'Pahang',
                'state_code' => '06',
                'state_abbr' => 'PHG'
            ],
            [
                'name' => 'Pulau Pinang',
                'state_code' => '07',
                'state_abbr' => 'PPN'
            ],
            [
                'name' => 'Perak',
                'state_code' => '08',
                'state_abbr' => 'PRK'
            ],
            [
                'name' => 'Perlis',
                'state_code' => '09',
                'state_abbr' => 'PER'
            ],
            [
                'name' => 'Selangor',
                'state_code' => '10',
                'state_abbr' => 'SGR'
            ],
            [
                'name' => 'Terengganu',
                'state_code' => '11',
                'state_abbr' => 'TRG'
            ],
            [
                'name' => 'Sabah',
                'state_code' => '12',
                'state_abbr' => 'SBH'
            ],
            [
                'name' => 'Sarawak',
                'state_code' => '13',
                'state_abbr' => 'SWK'
            ],
            [
                'name' => 'WP Kuala Lumpur',
                'state_code' => '14',
                'state_abbr' => 'KL'
            ],
            [
                'name' => 'WP Labuan',
                'state_code' => '15',
                'state_abbr' => 'LBU'
            ],
            [
                'name' => 'WP Putrajaya',
                'state_code' => '16',
                'state_abbr' => 'PJ'
            ],
        ]);
    }
}
