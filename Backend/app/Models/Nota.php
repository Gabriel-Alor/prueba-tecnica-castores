<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nota extends Model
{
    use HasFactory;
    protected $table = 'notas';
    protected $primaryKey = 'idnota';
    protected $fillable = ['idusuario', 'titulo', 'descripcion', 'imagen'];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'idusuario', 'idusuario');
    }

    public function personal()
    {
        return $this->usuario->personal;
    }

}
