<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonalTable extends Migration
{
    public function up()
    {
        Schema::create('personal', function (Blueprint $table) {
            $table->id('idpersonal');
            $table->string('apepaterno', 50);
            $table->string('apematerno', 50)->nullable();
            $table->string('nombre', 100);
            $table->string('direccion', 255)->nullable();
            $table->date('fechadeingreso');
        });
    }

    public function down()
    {
        Schema::dropIfExists('personal');
    }
}
