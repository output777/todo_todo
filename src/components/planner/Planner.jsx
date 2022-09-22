import React, {
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import leftArrowSvg from '../../assets/img/leftArrowSvg.svg'
import whitePlusSvg from '../../assets/img/whitePlusSvg.svg';
import notDoneSvg from '../../assets/img/notDoneSvg.svg';
import doneSvg from '../../assets/img/doneSvg.svg';
import threeDotSvg from '../../assets/img/threeDotSvg.svg';
import threeDotDoneSvg from '../../assets/img/threeDotDoneSvg.svg';
import { useNavigate } from 'react-router-dom';
import { __getTodayTodo, __postTodo, __deleteTodo, __updateTodo } from "../../redux/modules/plannerSlice";
import Modal from '../utils/Modal';

const Planner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [todoId, setTodoId] = useState(null);
  const [selectTodo, setSelectTodo] = useState(null);
  const [editTodoName, setEditTodoName] = useState(false);
  const [deleteTodoCheckModalVisible, setDeleteTodoCheckModalVisible] = useState(false);
  const [todoComplete, setTodoComplete] = useState(false);
  const [todoRate, setTodoRate] = useState(0);

  const { todos } = useSelector((state) => state.planner)
  console.log('todos', todos);
  console.log('todoList', todoList);



  const closeModal = () => {
    setModalVisible(false);
    setEditModalVisible(false);
    setEditTodoName(false);
    setDeleteTodoCheckModalVisible(false);
    setTodo('');
  };

  const onChangeInputHandler = (e) => {
    const { value } = e.target
    setTodo(value);
  }


  const onClickBackPlannerHandler = () => {
    navigate('/planner')
  }

  const onClickAddTodoModalHandler = () => {
    setModalVisible(true)
  }

  const onClickTodoAddHandler = async () => {
    if (todo.length > 0) {
      const newTodo = {
        content: todo,
        category: categoryName,
        isComplete: false,
      }
      await dispatch(__postTodo(newTodo))
      await dispatch(__getTodayTodo());
      setTodo('');
    }
  }


  const onClickSelectToTodoHandler = (e) => {
    console.dir(e.target.parentElement.parentElement.id);
    const { id } = e.target.parentElement.parentElement;
    const data = todoList.filter((data) => data.todoId === Number(id));
    console.log('data', data);
    setSelectTodo(...data);
    setEditModalVisible(true);
    setTodoId(id);
    setTodo(data[0].content)
  }

  const onClickEditTodoName = () => {
    setEditTodoName(true);
  }

  const onClickTodoDeleteHandler = () => {
    console.log('categoryId', categoryId);
    setDeleteTodoCheckModalVisible(true);
    setEditModalVisible(false);
  }

  const onClickEditTodoNameCancel = () => {

    setEditTodoName(false);
  }

  const onClickEditTodoHandler = async () => {
    const editTodo = {
      content: todo,
      isComplete: todoComplete,
    }
    await dispatch(__updateTodo({ todoId, editTodo }))
    await dispatch(__getTodayTodo());
    setModalVisible(false);
    setEditModalVisible(false);
    setEditTodoName(false);
    setTodo('');
  }

  const onClickEditTodoDeleteCancel = () => {
    setEditModalVisible(true);
    setDeleteTodoCheckModalVisible(false);
  }

  const onClickEditTodoDeleteCheck = () => {
    dispatch(__deleteTodo(todoId))
    setDeleteTodoCheckModalVisible(false);
  }

  const onClickTodoCompleteHandler = async (e) => {
    console.dir(e.target.parentElement.parentElement.id);
    const { id } = e.target.parentElement.parentElement;
    const data = todoList.filter((data) => data.todoId === Number(id));
    console.log('data', data);
    setTodoComplete(!data[0].complete);
    setTodoId(id);
    console.log('todoComplte', todoComplete);
    const completeTodo = {
      content: data[0].content,
      isComplete: !data[0].complete,
    }
    await dispatch(__updateTodo({ todoId: id, editTodo: completeTodo }))
    await dispatch(__getTodayTodo());
  }

  console.log('selectTodo', selectTodo)

  useEffect(() => {
    const rate = ((todoList.filter((data) => data.complete === true).length / todoList.length) * 100).toFixed()
    console.log('rate', rate);
    setTodoRate(rate);
  }, [todoList])


  useEffect(() => {
    const data = todos.filter((data) => data.category === categoryName);
    console.log('data', data)
    setTodoList([...data]);
  }, [todos])


  useEffect(() => {
    setCategoryName(localStorage.getItem('category'))
    setCategoryId(localStorage.getItem('categoryId'))
    dispatch(__getTodayTodo());
  }, [dispatch]);

  return (
    <StDiv>
      <div className='header'>
        <StHeaderBox>
          <div className='iconBox'>
            <img src={leftArrowSvg} alt="leftArrowIcon" onClick={onClickBackPlannerHandler} />
          </div>
          <div className="categoryTitle">
            <p>{categoryName}</p>
          </div>
        </StHeaderBox>
        <StCategoryProgressContainer>
          <div className='top'>
            <p className='title'>{todoList.filter((data) => data.complete === true).length}/{todoList.length}</p>
            <p>{!isNaN(todoRate) && todoRate}%</p>
          </div>
          <StProgressBarBox>
            <StProgressBar width={todoRate} backgroundColor='#74E272'></StProgressBar>
          </StProgressBarBox>
        </StCategoryProgressContainer>
      </div>
      <StPlusBtnBox onClick={onClickAddTodoModalHandler}>
        <img src={whitePlusSvg} alt="plusBtnIcon" />
      </StPlusBtnBox>

      <StTodoContainer>
        {todoList.length > 0 && todoList.filter((data) => data.complete === false).map((data) => (
          <StTodoItem key={data.todoId} name={data.title}>
            <div className='top' id={data.todoId}>
              <div className="content" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={notDoneSvg} alt="notDoneIcon" onClick={onClickTodoCompleteHandler} />
                <StTodoTitle className='title'>{data.content}</StTodoTitle>
              </div>
              <div className="option" onClick={onClickSelectToTodoHandler}>
                <img src={threeDotSvg} alt="threeDotIcon" />
              </div>
            </div>
          </StTodoItem>
        ))}
      </StTodoContainer>

      <StTodoContainer>
        {todoList.length > 0 && todoList.filter((data) => data.complete === true).map((data) => (
          <StTodoItem key={data.todoId} name={data.title}>
            <div className='top' id={data.todoId}>
              <div className="content" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={doneSvg} alt="doneIcon" onClick={onClickTodoCompleteHandler} />
                <StTodoTitle className='title' color='#E8E8E8'>{data.content}</StTodoTitle>
              </div>
              <div className="option">
                <img src={threeDotDoneSvg} alt="threeDotDoneIcon" />
              </div>
            </div>
          </StTodoItem>
        ))}
      </StTodoContainer>

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
              <p>투두 추가</p>
              <StTodoInput type='text' value={todo} onChange={onChangeInputHandler} />
              <div className='btnBox'>
                <StModalBtn onClick={closeModal}>취소</StModalBtn>
                <StModalBtn onClick={onClickTodoAddHandler}>추가</StModalBtn>
              </div>
            </StModalBtnBox>
          </Modal>
        )
      }

      {
        editModalVisible && (
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
              {!editTodoName
                ?
                <>
                  <p className='title'>{selectTodo.content}</p>
                  <p onClick={onClickEditTodoName}>이름 변경</p>
                  <div className='btnBox'>
                    <StModalBtn onClick={onClickTodoDeleteHandler}>삭제</StModalBtn>
                  </div>
                </>
                :
                <>
                  <p className='title'>투두 내용 변경</p>
                  <StTodoInput type='text' value={todo} onChange={onChangeInputHandler} />
                  <div className='btnBox'>
                    <StModalBtn onClick={onClickEditTodoNameCancel}>취소</StModalBtn>
                    <StModalBtn onClick={onClickEditTodoHandler}>확인</StModalBtn>
                  </div>
                </>
              }
            </StModalBtnBox>
          </Modal>
        )
      }

      {
        deleteTodoCheckModalVisible && (
          <Modal
            visible={deleteTodoCheckModalVisible}
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
              <p className='title'>투두를 삭제하시겠습니까?</p>
              <p>삭제하면 다시 불러올 수 없습니다</p>
              <div className='btnBox'>
                <StModalBtn onClick={onClickEditTodoDeleteCancel}>취소</StModalBtn>
                <StModalBtn onClick={onClickEditTodoDeleteCheck}>확인</StModalBtn>
              </div>
            </StModalBtnBox>
          </Modal>
        )
      }

    </StDiv >
  );
};


const StDiv = styled.div`
  width:100%;
  background-color: #fafafa;
  height: 100vh;
  font-family: "SUIT-Regular", sans-serif;
  overflow-y: scroll;

  & .header {
    width:100%;
    height:100px;
    position:fixed;
    background-color:#FFFFFF;
    display:flex;
    flex-direction:column;
    border-bottom: 1px solid #F1F3F5;

  }
`;

const StHeaderBox = styled.div`
  display: flex;

  & .iconBox {
      padding:10px;
      width:40%;
      height:100%;
      position:relative;

      img {
        position:absolute;
        bottom:0px;
        transform:translateY(-50%)
      }
    }

  & .categoryTitle {
      width:60%;
    }

    p {
      margin-top:15px;
      margin-bottom:5px;
    }
`

const StCategoryProgressContainer = styled.div`
  width:100%;
  height:auto;
  background-color:#fff;
  display: flex;
  flex-direction:column;
  box-sizing:border-box;
  margin-bottom:16px;
  padding: 15px 30px;


  & .top {
    display: flex;
    justify-content:space-between;
    align-items:center;
    padding-bottom:5px;

    p {
      margin:0
    }
  }
`

const StProgressBarBox = styled.div`
  width:100%;
  height:13px;
  border-radius:10px;
  background-color:#ECECEC;
`

const StProgressBar = styled.div`
  transition: all 0.3s;
  width: ${props => props.width + '%' || '0%'};
  height:13px;
  border-radius:10px;
  background:${props => props.backgroundColor || '#D34C4C'};
`

const StPlusBtnBox = styled.div`
  width: 55px;
  height: 55px;
  border-radius:75px;
  background-color: #FF8F27;
  position:fixed;
  top:545px;
  left: 281px;
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:10;
`

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

const StTodoInput = styled.textarea`
// props로 입력할 때 마다 border 색 변경하기
  border: 1px solid #D7D5D5;
  height:75px;
  width: 100%;
  padding:.5rem;
  border-radius: 16px;
  outline: none;
  resize:none;
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

const StTodoContainer = styled.div`
  padding: 20px;
  transform: translateY(100px);
  /* margin-top:20px; */
`

const StTodoItem = styled.div`
  width:100%;
  height:52px;
  border-radius: 16px;
  background-color:#fff;
  display: flex;
  flex-direction:column;
  box-sizing:border-box;
  margin:16px 0;
  padding: 15px 20px;
  -webkit-box-shadow: 0px 4px 8px -2px rgba(16,24,40,0.1); 
  box-shadow: 0px 4px 8px -2px rgba(16,24,40,0.1);

  & .top {
    display: flex;
    height:100%;
    justify-content:space-between;
    align-items:center;
    padding-bottom:5px;

    div.content {
      width:90%;
    }

    div.option {
      width:10%;
    }
  }
`

const StTodoTitle = styled.p`
      padding-left:10px;
      margin:0;
      color:${props => props.color || '#111'};
`


export default Planner;


