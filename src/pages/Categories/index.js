import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaListAlt, FaEdit, FaRegArrowAltCircleDown } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';
import { toast } from 'react-toastify';
import DialogActions from '@material-ui/core/DialogActions';

import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

import MainContainer from '../../components/MainContainer';
import Loading from '../../components/Loading';
import { ModifiedDialog } from '../../styles/global';
import { Container, NewCategory } from './styled';

export default function Categories() {
  const dispatch = useDispatch();

  const [obj, setObj] = useState([]);
  const [current, setCurrent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get('/categories/category-list');
        setObj(data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const data = get(err, 'response.data', {});
        const errors = get(data, 'errors', []);

        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        } else {
          toast.error('Erro desconhecido');
        }

        if (status === 401) dispatch(actions.loginFailure());
      }
    };

    getData();
  }, [dispatch]);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/categories/${current[0]}`);
      const newObj = [...obj];
      newObj.splice(current[2], 1);
      setObj(newObj);
      setIsLoading(false);
      toast.warning(`Cod: ${current[0]} ${current[1]} foi apagado!`);
    } catch (err) {
      const status = get(err, 'response.status', 0);

      if (status === 401) {
        toast.error('Você precisa fazer login');
      } else {
        toast.error('Ocorreu um erro ao excluir a categoria');
      }

      setIsLoading(false);
    }
    setOpen(false);
  };

  const handleSub = async (id) => {
    let subs = document.querySelectorAll(`.sub${id}`);

    if (subs[0]) {
      // to hide subsub if exists
      if (subs[0].style.display === 'grid') {
        const subsubs = document.querySelectorAll(`.subsub${id}`);
        if (subsubs) {
          subs = [...subs, ...subsubs];
          for (const sub of subs) {
            sub.style.display = 'none';
          }
        }
      } else {
        for (const sub of subs) {
          sub.style.display = 'grid';
        }
      }
    }
  };

  document.title = `Categorias - Inventory`;

  return (
    <MainContainer>
      <Loading isLoading={isLoading} />
      {!isLoading && (
        <Container>
          <h2>Categorias</h2>

          <NewCategory to="/category/" title="Nova categoria">
            <FaListAlt /> Novo
          </NewCategory>

          <div className="categoryList">
            {obj.map((objZ, index) => {
              let categoryType = 'main';
              let cat = 'Categoria Principal';

              if (objZ.id_parent !== 0 && objZ.id_parent_parent === 0) {
                // subcategory lvl 1
                categoryType = `sub1 sub${objZ.id_parent}`;
                cat = 'Subcategoria nível 1';
              } else if (objZ.id_parent !== 0 && objZ.id_parent_parent !== 0) {
                // subcategory lvl 2
                categoryType = `sub2 sub${objZ.id_parent} subsub${objZ.id_parent_parent}`;
                cat = 'Subcategoria nível 2';
              }

              return (
                <div key={String(objZ.id)} className={categoryType}>
                  <section className="arrowDown">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        handleSub(objZ.id);
                      }}
                      title="Subcategorias"
                    >
                      <FaRegArrowAltCircleDown size={16} />
                    </a>
                  </section>

                  <span title={cat}>{objZ.name}</span>

                  <section>
                    <Link to={`/category/${objZ.id}/edit`} title="Editar">
                      <FaEdit size={16} />
                    </Link>
                  </section>

                  <section>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrent([objZ.id, objZ.name, index]);
                        setOpen(true);
                      }}
                      title="Excluir"
                    >
                      <IoMdTrash size={16} />
                    </a>
                  </section>
                </div>
              );
            })}
          </div>
        </Container>
      )}
      <ModifiedDialog
        open={open}
        onClose={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
      >
        <h3>Excluir o registro abaixo?</h3>
        <span />
        <h5>{`${current[0]} ${current[1]}`}</h5>
        <DialogActions>
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
            title="Cancelar"
          >
            Cacelar
          </button>
          <button onClick={handleDelete} title="Excluir">
            Excluir
          </button>
        </DialogActions>
      </ModifiedDialog>
    </MainContainer>
  );
}
