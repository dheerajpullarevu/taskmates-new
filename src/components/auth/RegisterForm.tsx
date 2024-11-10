import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '../../types/user';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  roles: z.array(z.enum(['taskgiver', 'tasktaker'])).min(1, 'Select at least one role'),
  activeRole: z.enum(['taskgiver', 'tasktaker'])
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const register = useAuthStore(state => state.register);
  const { register: registerField, handleSubmit, watch, setValue, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      roles: ['taskgiver'],
      activeRole: 'taskgiver'
    }
  });

  const selectedRoles = watch('roles');

  const handleRoleChange = (role: UserRole, checked: boolean) => {
    const newRoles = checked
      ? [...selectedRoles, role]
      : selectedRoles.filter(r => r !== role);
    
    setValue('roles', newRoles);
    
    // If unchecking the active role, switch to the other role
    if (!checked && role === watch('activeRole') && newRoles.length > 0) {
      setValue('activeRole', newRoles[0]);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          {...registerField('name')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          {...registerField('email')}
          type="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          {...registerField('password')}
          type="password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          I want to
        </label>
        <div className="space-y-2">
          {[
            { role: 'taskgiver' as const, label: 'Post Tasks (Task Giver)' },
            { role: 'tasktaker' as const, label: 'Complete Tasks (Task Taker)' }
          ].map(({ role, label }) => (
            <div key={role} className="flex items-center">
              <input
                type="checkbox"
                id={`role-${role}`}
                checked={selectedRoles.includes(role)}
                onChange={(e) => handleRoleChange(role, e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`role-${role}`} className="ml-2 block text-sm text-gray-900">
                {label}
              </label>
            </div>
          ))}
        </div>
        {errors.roles && (
          <p className="mt-1 text-sm text-red-600">{errors.roles.message}</p>
        )}
      </div>

      {selectedRoles.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start as
          </label>
          <select
            {...registerField('activeRole')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {selectedRoles.map(role => (
              <option key={role} value={role}>
                {role === 'taskgiver' ? 'Task Giver' : 'Task Taker'}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;