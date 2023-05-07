<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComentariosTable extends Migration
{
    public function up()
    {
        Schema::create('comentarios', function (Blueprint $table) {
            $table->id('idcomentario');
            $table->text('comentario');
            $table->foreignId('idusuario_comentario')->constrained('usuarios', 'idusuario');
            $table->foreignId('idnota')->constrained('notas', 'idnota');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('comentarios');
    }

}
