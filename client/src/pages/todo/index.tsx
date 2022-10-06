import { Modal } from 'components';
import { MainLayout } from 'layouts';
import { Container, CreateBtn } from './style';
import { useState } from 'react';

export const TodoPage = () => {
  const [modalVisible, setModalVisivle] = useState(false);

  const handleOpenModal = () => {
    setModalVisivle(true);
  };

  const handleCloseModal = () => {
    setModalVisivle(false);
  };

  return (
    <MainLayout>
      <Container>
        <section className="list__section">
          <CreateBtn onClick={handleOpenModal}>+</CreateBtn>
          <ul className="list__wrapper"></ul>
        </section>
        <section className="detail"></section>
      </Container>
      <Modal modalVisible={modalVisible} onCancle={handleCloseModal} />
    </MainLayout>
  );
};
