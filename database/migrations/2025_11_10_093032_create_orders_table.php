<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\OrderStatus;
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            
            $table->float("total");
            $table->enum("status",array_column(OrderStatus::cases(),"value"))->default(OrderStatus::PENDING)->value;
          
            $table->foreignId("userId")
                ->references("id")
                ->on("users");
            $table->foreignId("paymentId")
                ->references("id")
                ->on("payments");
                
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
