<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotasTable extends Migration
{
    public function up()
    {

        Schema::create('notas', function (Blueprint $table) {
            $table->id('idnota');
            $table->unsignedBigInteger('idusuario');
            $table->string('titulo', 255);
            $table->longText('descripcion')->nullable();
            $table->longText('imagen')->nullable();
            $table->dateTime('fechahorapublicacion')->useCurrent();
            $table->timestamps();

            $table->foreign('idusuario')
                ->references('idusuario')
                ->on('usuarios')
                ->onDelete('cascade');
        });

    }



    public function down()
    {
        Schema::dropIfExists('notas');
    }
}
