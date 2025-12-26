<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index()
    {
        return Inertia::render('superadmin/users/index', [
            'users' => User::with('agencyMember.agency')->where('is_superadmin', false)->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('superadmin/users/create');
    }
}
