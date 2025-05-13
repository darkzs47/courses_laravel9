<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;
use App\Models\User;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required', 'regex:/^[А-ЯЁA-Z][а-яёa-z]+ [А-ЯЁA-Z][а-яёa-z]+ [А-ЯЁA-Z][а-яёa-z]+$/u', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'login' => ['required', 'alpha_num', 'max:255', 'unique:users,login'],
            'password' => [
                'required',
                'string',
                'min:6',
                'regex:/[a-z]/',
                'regex:/[A-Z]/',
                'confirmed',
            ],
            'password_confirmation' => ['required'],
            'avatar' => ['required', 'file', 'mimes:jpg,jpeg', 'max:2048'],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Поле ФИО обязательно для заполнения',
            'name.regex' => 'ФИО должно содержать только кириллицу и пробелы',
            'name.max' => 'ФИО максимум 255 символов',

            'email.max' => 'Email максимум 255 символов',
            'email.required' => 'Поле email обязательно для заполнения',
            'email.email' => 'Введите корректный email',
            'email.unique' => 'Этот email уже используется',

            'login.required' => 'Поле логин обязательно обязательно для заполнения',
            'login.alpha_num' => 'Логин должен содержать только латинские буквы и цифры',
            'login.unique' => 'Этот логин уже используется',

            'password.required' => 'Пароль обязателен обязательно для заполнения',
            'password.min' => 'Пароль должен быть не менее 6 символов',
            'password.regex' => 'Пароль должен содержать строчные и заглавные латинские буквы',
            'password.confirmed' => 'Пароли не совпадают',

            'password_confirmation' => 'Подтверждение пароля обязательно',

            'avatar.required' => 'Аватар обязателен',
            'avatar.mimes' => 'Аватар должен быть в формате JPG',
            'avatar.max' => 'Аватар не должен превышать 2 МБ',
        ];
    }
}
