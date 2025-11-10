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
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
          
            $table->integer("quantity");
            $table->foreignId("cartId")
                ->references("id")
                ->on("carts")
                ->onDelete("cascade");
            $table->foreignId("productVariantId")
                ->references("id")
                ->on("product_variants");
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
