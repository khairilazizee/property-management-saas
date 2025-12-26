<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('agency_id')->constrained('agencies')->onDelete('cascade');
            $table->foreignId('agent_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->integer('price')->default(1);
            $table->text('description')->nullable();
            $table->foreignId('property_category_id')->nullable()->constrained('property_category')->onDelete('cascade');
            $table->foreignId('property_type_id')->nullable()->constrained('property_type')->onDelete('cascade');
            $table->string('advertisement_type')->nullable(); // for rent, for sale, for lease
            $table->string('status')->nullable(); // available, sold, rented
            $table->integer('bedrooms')->default(1);
            $table->integer('bathrooms')->default(1);
            $table->integer('sqft')->default(1);
            $table->integer('parking')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
