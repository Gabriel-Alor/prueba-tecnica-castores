<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id('idusuario');
            $table->foreignId('idpersonal')->constrained('personal', 'idpersonal');
            $table->string('nombreusuario', 100)->unique();
            $table->string('password');
            $table->string('idtipopersonal');
        });
    }

    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}
