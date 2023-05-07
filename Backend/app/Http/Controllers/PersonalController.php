<?php

namespace App\Http\Controllers;

use App\Models\Personal;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PersonalController extends Controller
{
    public function index(){
        $personalConUsuarios = Personal::with('user')->get();
        return response()->json($personalConUsuarios);
    }

    public function store(Request $request){
        try {
            $request->validate([
                'apepaterno' => 'required',
                'apematerno' => 'required',
                'nombre' => 'required',
                'direccion' => 'required',
                'fechadeingreso' => 'required',
                'nombreusuario' => 'required|unique:usuarios',
                'password' => 'required'
            ]);

            $personal = Personal::create([
                'apepaterno' => $request->apepaterno,
                'apematerno' => $request->apematerno,
                'nombre' => $request->nombre,
                'direccion' => $request->direccion,
                'fechadeingreso' => $request->fechadeingreso
            ]);

            $usuario = new User([
                'idpersonal' => $personal->idpersonal,
                'nombreusuario' => $request->nombreusuario,
                'password' => bcrypt($request->password),
                'idtipopersonal' => 0 // o el valor que corresponda
            ]);
            $usuario->save();

            return response()->json([
                'message' => 'Personal creado satisfactoriamente!'
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => true,
                'message' => 'Ocurrio un erro al guardar registro'
            ], 404);
        } catch (\Exception $e) {


            return response()->json([
                'error' => true,
                'message' => 'El usuario o personal ya existe'
            ], 409);
        }

    }

    public function buscarPersonal($id){
        $personal = Personal::with('user')->find($id);

        if (!$personal) {
            return response()->json(['message' => 'Personal no encontrado'], 404);
        }

        return response()->json($personal);
    }

    public function login(Request $request){
        $request->validate([
            'nombreusuario' => 'required',
            'password' => 'required'
        ]);

        $usuario = User::where('nombreusuario', $request->nombreusuario)->first();

        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            return response()->json([
                'error' => true,
                'message' => 'Credenciales inválidas'
            ], 401);
        }

        return response()->json([
            'message' => 'Inicio de sesión exitoso',
            'idusuario' => $usuario->idusuario]
        );

    }

    public function editarDatosPersonal(Request $request, $id){
        try {
            $request->validate([
                'apepaterno' => 'required',
                'apematerno' => 'required',
                'nombre' => 'required',
                'direccion' => 'required',
                'fechadeingreso' => 'required',
                'nombreusuario' => 'required|unique:usuarios,nombreusuario,'.$id.',idpersonal',
            ]);

            $personal = Personal::find($id);
            if (!$personal) {
                return response()->json(['message' => 'Personal no encontrado'], 404);
            }
            $personal->apepaterno = $request->apepaterno;
            $personal->apematerno = $request->apematerno;
            $personal->nombre = $request->nombre;
            $personal->direccion = $request->direccion;
            $personal->fechadeingreso = $request->fechadeingreso;
            $personal->save();

            $usuario = User::where('idpersonal', $id)->first();
            if (!$usuario) {
                return response()->json(['message' => 'Usuario no encontrado'], 404);
            }
            $usuario->nombreusuario = $request->nombreusuario;
            $usuario ->idtipopersonal = $request->idtipopersonal;

            $usuario->save();

            return response()->json([
                'message' => 'Personal actualizado satisfactoriamente!'
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => true,
                'message' => 'Ocurrio un erro al guardar registro'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => 'El usuario o personal ya existe'
            ], 409);
        }
    }

    public function delete($id){
        $personal = Personal::find($id);
        if (!$personal) {
            return response()->json(['message' => 'Personal no encontrado'], 404);
        }
        $usuario = User::where('idpersonal', $id)->first();
        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        $personal->delete();
        $usuario->delete();
        return response()->json(['message' => 'Personal eliminado satisfactoriamente!'], 200);
    }

}
