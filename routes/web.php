<?php

use App\Http\Controllers\Admin\AdminAgenciesController;
use App\Http\Controllers\Admin\AdminLeadsController;
use App\Http\Controllers\Admin\AdminMemberController;
use App\Http\Controllers\Admin\AdminPropertiesController;
use App\Http\Controllers\Agent\AgentClientsController;
use App\Http\Controllers\Agent\AgentLeadsController;
use App\Http\Controllers\Agent\AgentPropertiesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Superadmin\AgenciesController as SuperadminAgenciesController;
use App\Http\Controllers\Superadmin\Settings\PropertyCategoryController;
use App\Http\Controllers\Superadmin\Settings\DistrictController as SuperadminDistrictController;
use App\Http\Controllers\Superadmin\Settings\PropertyTypeController;
use App\Http\Controllers\Superadmin\Settings\StateController;
use App\Http\Controllers\Superadmin\UsersController as SuperadminUsersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::middleware(['superadmin'])->group(function () {
        Route::prefix('superadmin')->group(function () {

            Route::get('/agencies', [SuperadminAgenciesController::class, 'index'])->name('superadmin.agencies.index');
            Route::get('/agencies/create', [SuperadminAgenciesController::class, 'create'])->name('superadmin.agencies.create');
            Route::post('/agencies/store', [SuperadminAgenciesController::class, 'store'])->name('superadmin.agencies.store');
            Route::get('/agencies/{agency:slug}/edit', [SuperadminAgenciesController::class, 'edit'])->name('superadmin.agencies.edit');
            Route::put('/agencies/{agency:slug}/update', [SuperadminAgenciesController::class, 'update'])->name('superadmin.agencies.update');
            Route::delete('/agencies/{agency:slug}/delete', [SuperadminAgenciesController::class, 'destroy'])->name('superadmin.agencies.delete');

            Route::get('/users', [SuperadminUsersController::class, 'index'])->name('superadmin.users.index');
            Route::get('/users/create', [SuperadminUsersController::class, 'create'])->name('superadmin.users.create');
            Route::post('/users/store', [SuperadminUsersController::class, 'store'])->name('superadmin.users.store');
            Route::get('/users/{user:id}/edit', [SuperadminUsersController::class, 'edit'])->name('superadmin.users.edit');
            Route::put('/users/{user:id}/store', [SuperadminUsersController::class, 'store'])->name('superadmin.users.store');
            Route::delete('/users/{user:id}/delete', [SuperadminUsersController::class, 'delete'])->name('superadmin.users.delete');

            Route::resource('/settings/state', StateController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);

            Route::get('/settings/district/{state:id}', [SuperadminDistrictController::class, 'index'])->name('superadmin.settings.district.index');
            Route::get('/settings/district/{state:id}/create', [SuperadminDistrictController::class, 'create'])->name('superadmin.settings.district.create');
            Route::post('/settings/district/{state:id}', [SuperadminDistrictController::class, 'store'])->name('superadmin.settings.district.store');
            Route::get('/settings/district/{state:id}/{district:id}/edit', [SuperadminDistrictController::class, 'edit'])->name('superadmin.settings.district.edit');
            Route::put('/settings/district/{state:id}/{district:id}', [SuperadminDistrictController::class, 'update'])->name('superadmin.settings.district.update');
            Route::delete('/settings/district/{state:id}/{district:id}', [SuperadminDistrictController::class, 'destroy'])->name('superadmin.settings.district.delete');

            Route::get('/settings/property/category', [PropertyCategoryController::class, 'index'])->name('superadmin.settings.property.category.index');
            Route::get('/settings/property/category/create', [PropertyCategoryController::class, 'create'])->name('superadmin.settings.property.category.create');
            Route::post('/settings/property/category/store', [PropertyCategoryController::class, 'store'])->name('superadmin.settings.property.category.store');
            Route::get('/settings/property/category/{category:id}/edit', [PropertyCategoryController::class, 'edit'])->name('superadmin.settings.property.category.edit');
            Route::put('/settings/property/category/{category:id}/update', [PropertyCategoryController::class, 'update'])->name('superadmin.settings.property.category.update');
            Route::delete('/settings/property/category/{category:id}/delete', [PropertyCategoryController::class, 'delete'])->name('superadmin.settings.property.category.delete');

            Route::get('/settings/property/category/{category:category_name}/type', [PropertyTypeController::class, 'index'])->name('superadmin.settings.property.type.view');
            Route::get('/settings/property/category/{category:category_name}/type/create', [PropertyTypeController::class, 'create'])->name('superadmin.settings.property.type.create');
            Route::post('/settings/property/category/{category:category_name}/type/store', [PropertyTypeController::class, 'store'])->name('superadmin.settings.property.type.store');
            Route::get('/settings/property/category/{category:category_name}/type/{type:type_slug}/edit', [PropertyTypeController::class, 'edit'])->name('superadmin.settings.property.type.edit');
            Route::put('/settings/property/category/{category:category_name}/type/{type:type_slug}/update', [PropertyTypeController::class, 'update'])->name('superadmin.settings.property.type.update');
            Route::delete('/settings/property/category/{category:category_name}/type/{type:type_slug}/delete', [PropertyTypeController::class, 'delete'])->name('superadmin.settings.property.type.delete');
        });
    });

    Route::middleware('agency')->group(function () {
        Route::prefix('agency')->group(function () {
            Route::get('/profile', [AdminAgenciesController::class, 'index'])->name('admin.agencies.index');
            Route::put('/profile/update', [AdminAgenciesController::class, 'update'])->name('admin.agencies.update');

            Route::get('/members', [AdminMemberController::class, 'index'])->name('admin.members.index');
            Route::get('/member/create', [AdminMemberController::class, 'create'])->name('admin.members.create');
            Route::post('/member/store', [AdminMemberController::class, 'store'])->name('admin.members.store');
            Route::get('/member/{member:id}/edit', [AdminMemberController::class, 'edit'])->name('admin.members.edit');
            Route::put('/member/{member:id}/update', [AdminMemberController::class, 'update'])->name('admin.members.update');
            Route::delete('/member/{member:id}/delete', [AdminMemberController::class, 'destroy'])->name('admin.members.delete');

            Route::get('/properties', [AdminPropertiesController::class, 'index'])->name('admin.properties.index');
            Route::get('/property/create', [AdminPropertiesController::class, 'create'])->name('admin.properties.create');
            Route::post('/property/store', [AdminPropertiesController::class, 'store'])->name('admin.properties.store');
            Route::get('/property/{property:id}/edit', [AdminPropertiesController::class, 'edit'])->name('admin.properties.edit');
            Route::put('/property/{property:id}/update', [AdminPropertiesController::class, 'update'])->name('admin.properties.update');
            Route::delete('/property/{property:id}/delete', [AdminPropertiesController::class, 'destroy'])->name('admin.properties.delete');

            Route::get('/leads', [AdminLeadsController::class, 'index'])->name('agent.leads.index');
        });
    });

    Route::middleware('agent')->group(function () {
        Route::prefix('agent')->group(function () {
            Route::get('/properties', [AgentPropertiesController::class, 'index'])->name('agent.properties.index');
            Route::get('/property/create', [AgentPropertiesController::class, 'create'])->name('agent.properties.create');
            Route::post('/property/store', [AgentPropertiesController::class, 'store'])->name('agent.properties.store');
            Route::get('/property/{property:id}/edit', [AgentPropertiesController::class, 'edit'])->name('agent.properties.edit');
            Route::put('/property/{property:id}/update', [AgentPropertiesController::class, 'update'])->name('agent.properties.update');
            Route::delete('/property/{property:id}/delete', [AgentPropertiesController::class, 'destroy'])->name('agent.properties.delete');

            // Route::get('/clients', [AgentClientsController::class, 'index'])->name('agent.clients.index');
            // Route::get('/client/create', [AgentClientsController::class, 'create'])->name('agent.clients.create');
            // Route::post('/client/store', [AgentClientsController::class, 'store'])->name('agent.clients.store');
            // Route::get('/client/{client:id}/edit', [AgentClientsController::class, 'edit'])->name('agent.clients.edit');
            // Route::put('/client/{client:id}/update', [AgentClientsController::class, 'update'])->name('agent.clients.update');
            // Route::delete('/client/{client:id}/delete', [AgentClientsController::class, 'destroy'])->name('agent.clients.delete');

            Route::get('/leads', [AgentLeadsController::class, 'index'])->name('agent.leads.index');
            Route::get('/lead/create', [AgentLeadsController::class, 'create'])->name('agent.leads.create');
            Route::post('/lead/store', [AgentLeadsController::class, 'store'])->name('agent.leads.store');
            Route::get('/lead/{lead:id}/edit', [AgentLeadsController::class, 'edit'])->name('agent.leads.edit');
            Route::put('/lead/{lead:id}/update', [AgentLeadsController::class, 'update'])->name('agent.leads.update');
            Route::delete('/lead/{lead:id}/delete', [AgentLeadsController::class, 'destroy'])->name('agent.leads.delete');
        });
    });
});

require __DIR__ . '/settings.php';
