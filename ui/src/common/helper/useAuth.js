
const useAuth=()=>{
    const user = localStorage.getItem('user')
    if(user){
      return JSON.parse(user)
    } else {
      return false
    }
  }

  export default useAuth