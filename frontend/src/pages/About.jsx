import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>ABOUT <span className="text-gray-700 font-medium">US</span></p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-[360px]" src={assets.about_image} alt="about"/>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi facere possimus molestias a quidem repudiandae consectetur sint illum reprehenderit. Illum, expedita nisi. Perspiciatis est id eos hic labore itaque unde maiores nam quidem, alias reprehenderit, sit animi ad tenetur aliquid!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero recusandae iusto provident dolores labore, tenetur culpa ea fugit. Quod soluta optio sapiente tenetur quos omnis, debitis dolorem harum porro dolorum minus quibusdam corrupti nemo enim neque aliquid culpa accusantium minima aspernatur excepturi cumque quo, dolores unde obcaecati. Hic voluptatibus impedit doloribus eligendi sint vitae ad?</p>
          <b className="text-gray-800">Our Vision</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore necessitatibus suscipit amet accusamus quidem, vero eaque expedita aliquam neque tempora veritatis nobis perspiciatis ipsum soluta.</p>
        </div>
      </div>

      <div className="text-xl text-center my-5">
        <p>WHY TO <span className="text-gray-700 font-semibold">CHOOSE US</span></p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 mr-2 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>EFFICIENCY</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae incidunt sit ullam nesciunt harum laboriosam.</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-16 mr-2 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>CONVENIENCE</b>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid facilis eos deserunt doloribus ex voluptate necessitatibus quod.</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-16 mr-2 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>PERSONALIZATION</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quisquam doloremque eos nobis quasi quia explicabo sunt delectus iusto.</p>
        </div>
      </div>
    </div>
  )
}

export default About;