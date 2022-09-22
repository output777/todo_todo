import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import leftArrowSvg from '../../assets/img/leftArrowSvg.svg'
import plusSvg from '../../assets/img/plusSvg.svg';
import threeDotSvg from '../../assets/img/threeDotSvg.svg';
import Modal from '../utils/Modal';
import { useDispatch, useSelector } from "react-redux";
import { __deleteCategory, __getCategory, __postCategory, __updateCategory } from '../../redux/modules/plannerSlice';

const PlannerCategoryAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useSelector((state) => state.planner);
  console.log('category', category)
  const [categoryName, setCategoryName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [selectCategory, setSelectCategory] = useState();
  const [editCategoryName, setEditCategoryName] = useState(false);
  const [deleteCategoryCheckModalVisible, setDeleteCategoryCheckModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
    setEditModalVisible(false);
    setEditCategoryName(false);
    setDeleteCategoryCheckModalVisible(false);
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
    const { id } = e.target.parentElement;
    console.log(id, typeof id);
    if (category.length > 0) {
      const data = category.filter((data) => (data.id === Number(id)));
      console.log('data', data);
      setSelectCategory(...data);
    }
    setCategoryId(id);
    setEditModalVisible(true);
  }
  console.log('categoryId', categoryId);
  console.log('selectCategory', selectCategory);

  const onClickEditCategoryName = () => {
    setEditCategoryName(true);
  }

  const onClickEditCategoryNameCancel = () => {
    setEditCategoryName(false);
  }

  const onClickCategoryDeleteHandler = () => {
    console.log('categoryId', categoryId);
    setDeleteCategoryCheckModalVisible(true);
    setEditModalVisible(false);
  }

  const onClickEditCategoryNameDeleteCancel = () => {
    setDeleteCategoryCheckModalVisible(false);
    setEditModalVisible(true);
  }

  const onClickEditCategoryNameDeleteCheck = () => {
    dispatch(__deleteCategory(categoryId));
    setDeleteCategoryCheckModalVisible(false);
  }

  const onClickEditCategoryNameHandler = async () => {
    const editCategoryName = {
      title: categoryName
    }
    await dispatch(__updateCategory({ id: categoryId, title: editCategoryName }))
    await dispatch(__getCategory())
    setDeleteCategoryCheckModalVisible(false);;
    setEditModalVisible(false);
    setEditCategoryName(false);
    setCategoryName('');
  }

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
            <p className='title'>{selectCategory.title}</p>
            {!editCategoryName
              ?
              <>
                <p onClick={onClickEditCategoryName}>이름 변경</p>
                <div className='btnBox'>
                  <StModalBtn onClick={onClickCategoryDeleteHandler}>삭제</StModalBtn>
                </div>
              </>
              :
              <>
                <StCategoryInput type='text' value={categoryName} onChange={onChangeInputHandler} />
                <div className='btnBox'>
                  <StModalBtn onClick={onClickEditCategoryNameCancel}>취소</StModalBtn>
                  <StModalBtn onClick={onClickEditCategoryNameHandler}>확인</StModalBtn>
                </div>
              </>
            }
          </StModalBtnBox>
        </Modal>
      )}

      {deleteCategoryCheckModalVisible && (
        <Modal
          visible={deleteCategoryCheckModalVisible}
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
            <p className='title'>'{selectCategory.title}'을 삭제하겠습니까?</p>
            <p>삭제하면 연결돼있는 투두가</p>
            <p>모두 사라집니다.</p>
            <div className='btnBox'>
              <StModalBtn onClick={onClickEditCategoryNameDeleteCancel}>취소</StModalBtn>
              <StModalBtn onClick={onClickEditCategoryNameDeleteCheck}>확인</StModalBtn>
            </div>
          </StModalBtnBox>
        </Modal>
      )
      }

      {
        modalVisible && (
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
        )
      }
    </StDiv >
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
  justify-content:center;
  align-items:center;
  border-radius:40px;

  & p {
    width:100%;
    margin:0;
    text-align: center;
    padding:5px;
  }
  
  & p.title {
    font-weight:600;
  }

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
  width: 100px;
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