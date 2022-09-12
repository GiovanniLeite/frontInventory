import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../store/modules/auth/actions';

import MainContainer from '../../components/MainContainer';
import Loading from '../../components/Loading';
import { Container } from './styled';

export default function Register(props) {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user.id);
  const nameStored = useSelector((state) => state.auth.user.name);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const { history } = props;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!id) return;

    setName(nameStored);
    setEmail(emailStored);
  }, [emailStored, id, nameStored]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
      document.querySelector('#name').style.borderColor = '#ff0000';
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido.');
      document.querySelector('#email').style.borderColor = '#ff0000';
    }

    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('Senha deve ter entre 6 e 50 caracteres');
      document.querySelector('#password').style.borderColor = '#ff0000';
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ name, email, password, id, history }));
  };

  document.title = `Register - Inventory`;

  return (
    <MainContainer>
      <Loading isLoading={isLoading} />
      {!isLoading && (
        <Container>
          <h2>{id ? 'Editar dados' : 'Crie sua conta'}</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              *Nome:
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
              />
            </label>

            <label htmlFor="email">
              *E-mail:
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail"
              />
            </label>

            <label htmlFor="password">
              *Senha:
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
              />
            </label>

            <button type="submit" id="save">
              {id ? 'Salvar' : 'Criar conta'}
            </button>
          </form>
        </Container>
      )}
    </MainContainer>
  );
}

Register.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
