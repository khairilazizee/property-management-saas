<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\AgencyMemberModel;
use Inertia\Inertia;

class PublicAgentPropertiesController extends Controller
{
    public function index(AgencyMemberModel $agent)
    {
        $properties = [
            [
                'id' => 1,
                'title' => 'Aira Residences, Mont Kiara',
                'price' => 'RM 1,250,000',
                'location' => 'Mont Kiara, Kuala Lumpur',
                'status' => 'For Sale',
                'tag' => 'High Rise',
                'bedrooms' => 3,
                'bathrooms' => 2,
                'sqft' => 1320,
            ],
            [
                'id' => 2,
                'title' => 'Lakeside Vista, Cyberjaya',
                'price' => 'RM 2,950 / month',
                'location' => 'Cyberjaya, Selangor',
                'status' => 'For Rent',
                'tag' => 'Condominium',
                'bedrooms' => 2,
                'bathrooms' => 2,
                'sqft' => 980,
            ],
            [
                'id' => 3,
                'title' => 'Taman Seri Damai Bungalow',
                'price' => 'RM 3,980,000',
                'location' => 'Petaling Jaya, Selangor',
                'status' => 'For Sale',
                'tag' => 'Landed',
                'bedrooms' => 5,
                'bathrooms' => 5,
                'sqft' => 4200,
            ],
            [
                'id' => 4,
                'title' => 'Merdeka Square Loft',
                'price' => 'RM 1,650,000',
                'location' => 'Kuala Lumpur City Centre',
                'status' => 'For Sale',
                'tag' => 'Loft',
                'bedrooms' => 2,
                'bathrooms' => 2,
                'sqft' => 1200,
            ],
        ];

        return Inertia::render('public/agent/properties/index', [
            'agent' => [
                'name' => $agent->name,
                'slug' => $agent->agent_slug,
                'renNo' => $agent->ren_no,
            ],
            'properties' => $properties,
        ]);
    }
}
