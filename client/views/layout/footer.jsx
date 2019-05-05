// 把html写在JavaScript里
import '../../assets/styles/footer.styl'
export default {
  data () {
    return {
      author: 'Panda'
    }
  },
  render () {
    return (
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
