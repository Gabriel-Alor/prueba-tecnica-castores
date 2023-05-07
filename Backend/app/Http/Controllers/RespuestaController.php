<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use App\Models\Respuesta;
use Illuminate\Http\Request;

class RespuestaController extends Controller
{
    public function index()
    {
        $respuestas = Respuesta::all();
        return response()->json(['respuestas' => $respuestas]);
    }

    public function show($id)
    {
        $respuesta = Respuesta::find($id);
        return response()->json(['respuesta' => $respuesta]);
    }

    public function store(Request $request)
    {
        $respuesta = new Respuesta;
        $respuesta->comentario_id = $request->input('comentario_id');
        $respuesta->usuario_id = $request->input('usuario_id');
        $respuesta->respuesta = $request->input('respuesta');
        $respuesta->save();

        if ($respuesta) {
            return response()->json([
                'error' => false,
                'respuesta' => 'Respuesta guardada con éxito'
            ]);
        } else {
            return response()->json([
                'error' => true,
                'respuesta' => 'Error al guardar la respuesta'
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $respuesta = Respuesta::find($id);
        $respuesta->comentario_id = $request->input('comentario_id');
        $respuesta->usuario_id = $request->input('usuario_id');
        $respuesta->respuesta = $request->input('respuesta');
        $respuesta->save();

        return response()->json(['respuesta' => $respuesta]);
    }

    public function destroy($id)
    {
        $respuesta = Respuesta::find($id);
        $respuesta->delete();

        return response()->json(['mensaje' => 'Respuesta eliminada']);
    }

    public function comentariosConRespuestas($idnota){
        $comentarios = Comentario::where('idnota', $idnota)->with('usuario')->get();
        foreach ($comentarios as $comentario) {
            $comentario->respuestas = Respuesta::where('comentario_id', $comentario->idcomentario)->with('usuario')->get();
        }
        return response()->json(['comentarios' => $comentarios]);
    }
}
