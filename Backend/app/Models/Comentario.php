<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentario extends Model{

    protected $table = 'comentarios';
    protected $primaryKey = 'idcomentario';
    protected $fillable = ['idnota', 'idusuariocomentario', 'comentario'];

    public function nota()
    {
        return $this->belongsTo(Nota::class, 'idnota');
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'idusuario_comentario');
    }
}

