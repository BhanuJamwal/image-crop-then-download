import React,{Component} from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import {card,cardBody} from 'mdbreact'
import './Upload.css'

import {base64StringtoFile,
        downloadBase64File,
        extractImageFileExtensionFromBase64,
        image64toCanvasRef} from './Reuseble';

class Upload extends React.Component {
  constructor(props){
    super(props);
    this.imagePreviewCanvasRef=React.createRef()
    this.state = {
      file: null,
      imgSrcExt:null,
      crop:{
        aspect:1/1
      }
    }
    this.handleChange = this.handleChange.bind(this)
    
  }
  handleChange(event) {
    const myResult=URL.createObjectURL(event.target.files[0])
    this.setState({
      file: myResult,
      imgSrcExt:extractImageFileExtensionFromBase64(myResult)
    })
 };
 handleImageLoaded=(image)=>{
   //console.log(image)
 }
 handleOnChange=(crop,pixelCrop)=>{
   this.setState({
     crop:crop
   })
 }
 handleOnCropComplete=(crop,pixelCrop)=>{
   //console.log(crop,pixelCrop)
   const canvasRef=this.imagePreviewCanvasRef.current
   const {file}=this.state
   image64toCanvasRef(canvasRef,file,pixelCrop)
 }
 handleDownloadClick=(event)=>{
   event.preventDefault()
   const {file}=this.state
   if(file){
     const canvasRef=this.imagePreviewCanvasRef.current
     const {imgSrcExt}=this.state
     const imageData64=canvasRef.toDataURL('image/'+imgSrcExt)
     const myFilename="previewFile."+imgSrcExt
     const myNewCroppedFile=base64StringtoFile(imageData64,myFilename)
     console.log(myNewCroppedFile)
     downloadBase64File(imageData64,myFilename)
     
   }
 
   
 }
  render() {
    
    return (
      <div className="container">
      <div className="image">
      <input type="file" onChange={this.handleChange}/>
      <br/> 
      <ReactCrop 
      src={this.state.file}
      crop={this.state.crop}
      onImageLoaded={this.handleImageLoaded}
      onComplete={this.handleOnCropComplete}
      onChange={this.handleOnChange}/>
      </div>
     
      
      <div className="canvas">
      <canvas ref={this.imagePreviewCanvasRef}></canvas>
      <button onClick={this.handleDownloadClick}>download</button>
      </div>    
      </div>
    );
  }
}
export default Upload;