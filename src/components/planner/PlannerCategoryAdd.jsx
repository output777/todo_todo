import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import leftArrowSvg from '../../assets/img/leftArrowSvg.svg'
import plusSvg from '../../assets/img/plusSvg.svg';
import threeDotSvg from '../../assets/img/threeDotSvg.svg';
import Modal from '../utils/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { __getCategory, __postCategory } from '../../redux/modules/plannerSlice';

const PlannerCategoryAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useSelector((state) => state.planner);
  console.log('category', category)
  const [categoryName, setCategoryName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  const closeModal = () => {
    setModalVisible(false);
    setEditModalVisible(false);
  };

  const onChangeInputHandler = (e) => {
    const { value } = e.target
    setCategoryName(value);
  }

  const onClickBackHandler = () => {
    navigate('/planner');
  }

  const onClickCategorynHandler = () => {
    setModalVisible(true);
  }

  const onClickCategoryAddHandler = async () => {
    if (categoryName.length > 0) {
      const newCategory = {
        title: categoryName
      }
      await dispatch(__postCategory(newCategory));
      await dispatch(__getCategory())
      setCategoryName('');
    }
  }

  const onClickModalEditHandler = (e) => {
    console.log(e.target.parentElement.id);
    setCategoryId(e.target.parentElement.id);
    setEditModalVisible(true);
  }
  console.log('categoryId', categoryId);

  useEffect(() => {
    dispatch(__getCategory())
  }, [dispatch]);

  return (
    <StDiv>
      <div className='header'>
        <div className='iconBox'>
          <img src={leftArrowSvg} alt="leftArrowIcon" onClick={onClickBackHandler} />
        </div>
        <p>과목 목록</p>
        <div className='iconBox'>
          <img src={plusSvg} alt="plusIcon" onClick={onClickCategorynHandler} />
        </div>
      </div>
      {category.length > 0 && category.map((data) => (
        <StCategoryBox key={data.id} id={data.id}>
          <p>{data.title}</p>
          <img src={threeDotSvg} alt="threeDotIcon" onClick={onClickModalEditHandler} />
        </StCategoryBox>
      ))}

      {editModalVisible && (
        <Modal
          visible={editModalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
          width="250px"
          height="150px"
          radius="20px"
          top="40%"
          backgroundcolor="rgba(0, 0, 0, 0.2)"
        >
          <StModalBtnBox>
            <p>{category.length > 0 && category[categoryId].title}</p>
            {/* props로 입력할 때 마다 border 색 변경하기 */}
            <StCategoryInput type='text' value={categoryName} onChange={onChangeInputHandler} />
            <div className='btnBox'>
              <StModalBtn onClick={closeModal}>취소</StModalBtn>
              <StModalBtn onClick={onClickCategoryAddHandler}>추가</StModalBtn>
            </div>
          </StModalBtnBox>
        </Modal>
      )}

      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
          width="250px"
          height="150px"
          radius="20px"
          top="40%"
          backgroundcolor="rgba(0, 0, 0, 0.2)"
        >
          <StModalBtnBox>
            <p>추가할 과목 이름을 입력해주세요</p>
            {/* props로 입력할 때 마다 border 색 변경하기 */}
            <StCategoryInput type='text' value={categoryName} onChange={onChangeInputHandler} />
            <div className='btnBox'>
              <StModalBtn onClick={closeModal}>취소</StModalBtn>
              <StModalBtn onClick={onClickCategoryAddHandler}>추가</StModalBtn>
            </div>
          </StModalBtnBox>
        </Modal>
      )}
    </StDiv>
  )
}

const StDiv = styled.div`
  background-color: #fafafa;
  height: 100vh;
  font-family: "SUIT-Regular", sans-serif;

  & div.header {
    width:100%;
    height:100px;
    display: flex;
    background-color:#FFFFFF;
    justify-content:space-between;
    align-items:flex-end;
    padding: 1rem;
    border-bottom: 1px solid #F1F3F5;

    .iconBox {
      padding:10px;
      display: flex;
      justify-content:center;
      align-items:center;
    }

    p {
      margin:0;
      padding:10px;
    }
  }


`;

const StModalBtnBox = styled.div`
  width:100%;
  height:100%;
  display: flex;
  padding: 1rem;
  box-sizing:border-box;
  flex-direction:column;
  border-radius:40px;

  & .btnBox {
    display: flex;
  }
`
const StCategoryInput = styled.input`
// props로 입력할 때 마다 border 색 변경하기
  border: 1px solid #D7D5D5;
  height:50px;
  width: 100%;
  padding:.5rem;
  border-radius: 16px;
  outline: none;
`


const StModalBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items:center;
  width: 100%;
  height:50%;
  outline:none;
  border: none;
  background-color: white;
  color: #ff8f27;

  margin-top: 5%;

  &:last-child {
    border-bottom: none;
  }
`;

const StCategoryBox = styled.div`
  width:320px;
  height:52px;
  border-radius:16px;
  padding: 0 16px 0 24px;
  background-color:#fff;
  display: flex;
  align-items:center;
  justify-content:space-between;
  margin:16px auto;
  -webkit-box-shadow: 0px 4px 8px -2px rgba(16,24,40,0.1); 
  box-shadow: 0px 4px 8px -2px rgba(16,24,40,0.1);

  & p {
    margin:0;
  }
`

export default PlannerCategoryAdd