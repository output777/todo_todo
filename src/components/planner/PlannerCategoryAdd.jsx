import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import leftArrowSvg from "../../assets/img/leftArrowSvg.svg";
import plusSvg from "../../assets/img/plusSvg.svg";
import threeDotSvg from "../../assets/img/threeDotSvg.svg";
import Modal from "../utils/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  __deleteCategory,
  __getCategory,
  __postCategory,
  __updateCategory,
} from "../../redux/modules/plannerSlice";
import { useRef } from "react";

const PlannerCategoryAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useSelector((state) => state.planner);

  const [categoryName, setCategoryName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [selectCategory, setSelectCategory] = useState();
  const [editCategoryName, setEditCategoryName] = useState(false);
  const [deleteCategoryCheckModalVisible, setDeleteCategoryCheckModalVisible] =
    useState(false);

  const categoryInput = useRef(null);

  const closeModal = () => {
    setModalVisible(false);
    setEditModalVisible(false);
    setEditCategoryName(false);
    setDeleteCategoryCheckModalVisible(false);
  };

  const onChangeInputHandler = (e) => {
    const { value } = e.target;
    setCategoryName(value);
  };

  const onClickBackHandler = () => {
    navigate("/planner");
  };

  const onClickCategorynHandler = () => {
    setModalVisible(true);
  };

  const onClickCategoryAddHandler = async () => {
    let nickname = localStorage.getItem("nickname");
    if (categoryName.length > 0) {
      const newCategory = {
        title: categoryName,
      };
      await dispatch(__postCategory(newCategory));
      await dispatch(__getCategory(nickname));
      setCategoryName("");
      categoryInput.current.focus();
    }
  };

  const onClickModalEditHandler = (e) => {
    const { id } = e.target.parentElement;
    const data = category?.filter((data) => data.id === Number(id));
    setSelectCategory(...data);
    setCategoryId(id);
    setEditModalVisible(true);
  };

  const onClickEditCategoryName = () => {
    setEditCategoryName(true);
  };

  const onClickEditCategoryNameCancel = () => {
    setEditCategoryName(false);
  };

  const onClickCategoryDeleteHandler = () => {
    setDeleteCategoryCheckModalVisible(true);
    setEditModalVisible(false);
  };

  const onClickEditCategoryNameDeleteCancel = () => {
    setDeleteCategoryCheckModalVisible(false);
    setEditModalVisible(true);
  };

  const onClickEditCategoryNameDeleteCheck = () => {
    dispatch(__deleteCategory(categoryId));
    setDeleteCategoryCheckModalVisible(false);
  };

  const onClickEditCategoryNameHandler = async () => {
    let nickname = localStorage.getItem("nickname");
    const editCategoryName = {
      title: categoryName,
    };
    await dispatch(
      __updateCategory({ id: categoryId, title: editCategoryName })
    );
    await dispatch(__getCategory(nickname));
    setDeleteCategoryCheckModalVisible(false);
    setEditModalVisible(false);
    setEditCategoryName(false);
    setCategoryName("");
  };

  useEffect(() => {
    let nickname = localStorage.getItem("nickname");
    dispatch(__getCategory(nickname));
  }, [dispatch]);

  return (
    <StDiv>
      <div className='header'>
        <div className='iconBox'>
          <img
            src={leftArrowSvg}
            alt='leftArrowIcon'
            onClick={onClickBackHandler}
          />
        </div>
        <p className='title'>?????? ??????</p>
        <div className='iconBox'>
          <img src={plusSvg} alt='plusIcon' onClick={onClickCategorynHandler} />
        </div>
      </div>
      <div style={{ paddingBottom: "20px" }}>
        {category?.map((data) => (
          <StCategoryBox key={data.id} id={data.id}>
            <p>{data.title}</p>
            <img
              src={threeDotSvg}
              alt='threeDotIcon'
              onClick={onClickModalEditHandler}
            />
          </StCategoryBox>
        ))}
      </div>

      <Modal
        visible={editModalVisible}
        closable={true}
        maskClosable={true}
        onClose={closeModal}
        width='290px'
        height='170px'
        radius='40px'
        top='40%'
        backgroundcolor='rgba(0, 0, 0, 0.2)'
      >
        <StModalBtnBox>
          <p className='edittitle'>{selectCategory?.title}</p>
          {!editCategoryName ? (
            <StEditBtnBox>
              <p className='updatetitle' onClick={onClickEditCategoryName}>
                ?????? ??????
              </p>
              <div className='btnBox'>
                <StModalDeleteBtn onClick={onClickCategoryDeleteHandler}>
                  ??????
                </StModalDeleteBtn>
              </div>
              <StEditCancelBtn onClick={closeModal}>??????</StEditCancelBtn>
            </StEditBtnBox>
          ) : (
            <>
              <StCategoryInput
                minLength='2'
                maxLength='15'
                type='text'
                value={categoryName}
                onChange={onChangeInputHandler}
              />
              <StEditBtnbox>
                <StModalAddBtn onClick={onClickEditCategoryNameHandler}>
                  ??????
                </StModalAddBtn>
                <StModalCancelBtn onClick={onClickEditCategoryNameCancel}>
                  ??????
                </StModalCancelBtn>
              </StEditBtnbox>
            </>
          )}
        </StModalBtnBox>
      </Modal>

      <Modal
        visible={deleteCategoryCheckModalVisible}
        closable={true}
        maskClosable={true}
        onClose={closeModal}
        width='290px'
        height='170px'
        radius='40px'
        top='40%'
        backgroundcolor='rgba(0, 0, 0, 0.2)'
      >
        <StModalBtnBox>
          <p className='title'>'{selectCategory?.title}'??? ?????????????????????????</p>
          <p className='confirm'>???????????? ??????????????? ?????????</p>
          <p className='confirm'>?????? ???????????????.</p>
          <StDeleteBtnbox>
            <StModalAddBtn onClick={onClickEditCategoryNameDeleteCheck}>
              ??????
            </StModalAddBtn>
            <StModalCancelBtn onClick={onClickEditCategoryNameDeleteCancel}>
              ??????
            </StModalCancelBtn>
          </StDeleteBtnbox>
        </StModalBtnBox>
      </Modal>

      <Modal
        visible={modalVisible}
        closable={true}
        maskClosable={true}
        onClose={closeModal}
        width='290px'
        height='180px'
        radius='40px'
        top='40%'
        backgroundcolor='rgba(0, 0, 0, 0.2)'
      >
        <div>
          <StModalBtnBox>
            <p className='title'>?????? ??????</p>
            {/* props??? ????????? ??? ?????? border ??? ???????????? */}
            <StCategoryInput
              minLength='2'
              maxLength='15'
              type='text'
              value={categoryName}
              onChange={onChangeInputHandler}
              placeholder='?????? ????????? ??????????????????.(1-15???)'
              ref={categoryInput}
            />
          </StModalBtnBox>

          <StbuttonSet>
            <StModalAddBtn onClick={onClickCategoryAddHandler}>
              ??????
            </StModalAddBtn>
            <StModalCancelBtn onClick={closeModal}>??????</StModalCancelBtn>
          </StbuttonSet>
        </div>
      </Modal>
    </StDiv>
  );
};

const StDiv = styled.div`
  background-color: #fafafa;
  height: 100%;
  font-family: "SUIT-Regular", sans-serif;

  & div.header {
    /* width: 100%; */
    height: 71px;
    display: flex;
    background-color: #ffffff;
    justify-content: space-between;
    align-items: flex-end;
    padding: 1rem;
    box-sizing: border-box;
    border-bottom: 1px solid #f1f3f5;
    position: sticky;
    top: 0;

    .iconBox {
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .title {
      font-size: 17px;
      font-weight: 600;
    }

    p {
      margin: 0;
      padding: 10px;
    }
  }
`;

const StModalBtnBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 1rem;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  & p {
    width: 100%;
    margin: 0;
    text-align: center;
    /* padding: 5px; */
  }

  & p.confirm {
    position: relative;
    top: 7px;
  }

  & p.updatetitle {
    font-size: 16px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 45px;
    border-top: 1px solid #f1f3f5;
    cursor: default;
  }

  & p.title {
    font-size: 17px;
    margin-top: 15px;
    font-weight: 600;
    position: relative;
    bottom: 5px;
  }

  & p.edittitle {
    font-size: 17px;
    margin-top: 15px;
    font-weight: 600;
    position: relative;
    bottom: 10px;
    cursor: default;
  }

  & .btnBox {
    display: flex;
  }
`;

const StCategoryInput = styled.input`
  // props??? ????????? ??? ?????? border ??? ????????????
  border: 1px solid #d7d5d5;
  height: 25px;
  margin-top: 10px;
  width: 250px;
  padding: 0.5rem;
  border-radius: 16px;
  outline: none;
  font-size: 15px;
  font-family: "SUIT-Regular";
  &:focus {
    border-color: #ff8f27;
  }
`;

const StModalAddBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 145px;
  height: 50px;
  outline: none;
  border-right: none;
  border-top: 1px solid #f1f3f5;
  border-left: none;
  border-bottom: none;
  border-radius: 0 0 0 40px;
  background-color: white;
  color: #ff8f27;
  font-family: "SUIT-Regular";
  font-weight: 600;
  font-size: 16px;

  &:last-child {
    border-bottom: none;
  }
`;

const StModalCancelBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 145px;
  height: 50px;
  outline: none;
  border-left: none;
  border-top: 1px solid #f1f3f5;
  border-left: 1px solid #f1f3f5;
  border-right: none;
  border-bottom: none;
  border-radius: 0 0 40px 0;
  background-color: white;
  color: black;
  font-family: "SUIT-Regular";
  font-weight: 600;
  font-size: 16px;

  &:last-child {
    border-bottom: none;
  }
`;

const StModalDeleteBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 40px;
  color: red;
  outline: none;
  border-top: 1px solid #f1f3f5;
  border-bottom: none;
  border-left: none;
  border-right: none;
  border-radius: 0 0 16px 16px;
  background-color: white;
  font-size: 16px;
  font-weight: 600;
  font-family: "SUIT-Regular";
  padding-top: 10px;
`;

const StbuttonSet = styled.div`
  display: flex;
  position: relative;
  top: 10px;
`;

const StEditCancelBtn = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 40px;
  position: absolute;
  margin-top: 26px;
  cursor: default;
`;

const StEditBtnBox = styled.div`
  position: relative;
  top: 10px;
`;

const StEditBtnbox = styled.div`
  display: flex;
  position: relative;
  top: 15px;
`;

const StCategoryBox = styled.div`
  width: 90%;
  height: auto;
  border-radius: 16px;
  /* padding: 0 16px 0 24px; */
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px auto;
  padding: 10px;
  -webkit-box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1);
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1);
  box-sizing: border-box;

  & p {
    margin: 0;
  }
`;

const StDeleteBtnbox = styled.div`
  display: flex;
  position: relative;
  top: 20px;
`;
export default PlannerCategoryAdd;
