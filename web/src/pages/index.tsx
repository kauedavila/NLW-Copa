// interface HomeProps {
//   count: number;
// }

import Image from "next/image";
import appPreviewImg from "../assets/nlw-copa-preview.png";
import avatarsImg from "../assets/users-avatar-example.png";

import logoImg from "../assets/logo.svg";
import iconImg from "../assets/icon-check.svg";
import { api } from "../assets/lib/axios";
import { FormEvent, useState } from "react";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("");

  async function createPool(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await api.post("/pools", {
        title: poolTitle,
      });
      const { code } = response.data;
      await navigator.clipboard.writeText(code);
      alert(
        "Bolão criado com sucesso! Código copiado para a área de transferência!"
      );
      setPoolTitle("");
    } catch (err) {
      alert("Falha ao criar o bolão!");
      console.log(err);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-28 max-w-[1124px] h-screen mx-auto items-center">
      <main>
        <Image src={logoImg} alt="Logo" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={avatarsImg} alt="" />
          <strong className="text-[#E1E1E6] text-xl">
            <span className="text-[#129E57]">+{props.userCount}</span> pessoas
            já estão usando.
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-x-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-[#202024] border border-[#323238] text-sm text-[#E1E1E6]"
            type="text"
            placeholder="Qual nome do bolão"
            onChange={(event) => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            className="bg-[#F7DD43] hover:bg-[#f7dc43dc] px-6 py-4 rounded uppercase text-sm font-bold text-[#323238]"
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-[#E1E1E6] leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>
        <div className="flex justify-between mt-10 pt-10 border-t border-[#202024] text-[#E1E1E6]">
          <div className="flex items-center gap-6">
            <Image src={iconImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões Criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-[#202024]" />

          <div className="flex items-center gap-6">
            <Image src={iconImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span>Palpites Enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image src={appPreviewImg} alt="Celulares" quality={100} />
    </div>
  );
}

// TODO: getStaticProps

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("pools/count"),
      api.get("guesses/count"),
      api.get("users/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  };
};
