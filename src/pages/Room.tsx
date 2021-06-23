import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';

import { Button } from "../components/Button";
import { RoomCode } from '../components/RoomCode';

import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export const Room = () => {
  const params = useParams<RoomParams>();

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={params.id} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala 99</h1>
          <span>2 pergunta(s)</span>
        </div>

        <form>
          <textarea
            placeholder="O que você quer perguntar?"
            value=''
          />

          <div className="form-footer">
            <div className="user-info">
              {/* <img src='' alt='jose' /> */}
              <span>José</span>
            </div>
            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>

        {/* {JSON.stringify(questions)} */}
      </main>
    </div>
  );
}