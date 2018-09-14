export class Scheduler {

    private prev: Date

    start(onHourChanged, onDateChanged) {
        //alert("start")
      this.prev = new Date()
      setInterval(() => {
        let current = new Date()
        //alert(current)
        //alert(this.prev)
        console.log("pre: " + this.prev.getMinutes() + "cur: " + current.getMinutes())
        if(this.prev.getMinutes() != current.getMinutes()){//alert(current.getSeconds())
            onHourChanged()
          }
        /*if(this.prev.getHours() != current.getHours()){
          onHourChanged()
        }*/
        if(this.prev.getDate() != current.getDate()){
          onDateChanged()
        }
        this.prev = current
      }, 1000)
    }
}