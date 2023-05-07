<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $table = 'usuarios';
    protected $primaryKey = 'idusuario';
    public $timestamps = false;

    protected $fillable = [
        'idpersonal',
        'nombreusuario',
        'password',
        'idtipopersonal'
    ];

    public function personal()
    {
        return $this->belongsTo(Personal::class, 'idpersonal', 'idpersonal');
    }
}
