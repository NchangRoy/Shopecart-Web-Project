<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\DiscountType;
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('discounts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            
            $table->enum("type",array_column(DiscountType::cases(),"value"));
            $table->dateTime("startDate");
            $table->dateTime("endDate");
            $table->string("value");
            $table->integer("nbMaxUsage");
            $table->foreignId("productId")
                ->references("id")
                ->on("products")
                ->onDelete("cascade");
            
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discounts');
    }
};
