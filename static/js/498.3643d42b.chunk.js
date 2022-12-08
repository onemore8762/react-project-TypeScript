"use strict";(self.webpackChunksamurai_way=self.webpackChunksamurai_way||[]).push([[498],{1498:function(e,s,t){t.r(s),t.d(s,{default:function(){return E}});var i=t(5671),n=t(3144),r=t(136),o=t(5716),l=t(2791),a=t(7781),u=t(885),c="ProfileInfo_descriptionBlock__XBXuJ",d=t(5813),h=t(184),p=function(e){var s=(0,l.useState)(!1),t=(0,u.Z)(s,2),i=t[0],n=t[1],r=(0,l.useState)(e.status),o=(0,u.Z)(r,2),a=o[0],c=o[1];(0,l.useEffect)((function(){c(a)}),[e.status]);var d=function(){n(!1),e.updateStatus(a)};return(0,h.jsxs)(h.Fragment,{children:[!i&&(0,h.jsxs)("div",{children:[(0,h.jsx)("b",{children:"Status:"}),(0,h.jsx)("span",{onDoubleClick:function(){n(!0)},children:e.status||"Not status"})]}),i&&(0,h.jsxs)("div",{children:[(0,h.jsx)("b",{children:"Status:"}),(0,h.jsx)("input",{onKeyDown:function(e){"Enter"===e.key&&d()},onChange:function(e){c(e.currentTarget.value)},autoFocus:!0,onBlur:d,value:a})]})]})},f=t(4353),j=t(5705),x=t(8687),v=x.I0,m=x.v9,b=t(81),g=function(e){var s=e.setEditMode,t=(0,l.useState)(""),i=(0,u.Z)(t,2),n=i[0],r=i[1],o=v(),a=m((function(e){return e.profilePage.profile}));return(0,h.jsx)(j.J9,{initialValues:a,onSubmit:function(e,t){t.setSubmitting(!0),o((0,b.Ii)(a.userId,e)).then((function(){s()})).catch((function(e){r(e)})).finally((function(){t.setSubmitting(!1)}))},children:function(e){var s=e.isSubmitting;return(0,h.jsxs)(j.l0,{children:[(0,h.jsx)("span",{style:{color:"#ff0000",backgroundColor:"#fff"},children:n&&n})," ",(0,h.jsx)("br",{}),(0,h.jsx)("button",{type:"submit",disabled:s,children:"save"}),(0,h.jsxs)("div",{children:[(0,h.jsx)("b",{children:"Full name"}),":",(0,h.jsxs)("div",{children:[(0,h.jsx)(j.gN,{id:"fullName",name:"fullName",placeholder:"Full name"})," "]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("b",{children:"Looking for a job"})," :",(0,h.jsx)("div",{children:(0,h.jsx)(j.gN,{id:"lookingForAJob",name:"lookingForAJob",type:"checkbox"})})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("b",{children:"My professional skills"}),":",(0,h.jsx)("div",{children:(0,h.jsx)(j.gN,{id:"lookingForAJobDescription",name:"lookingForAJobDescription",placeholder:""})})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("b",{children:"About me"}),":",(0,h.jsx)("div",{children:(0,h.jsx)(j.gN,{id:"aboutMe",name:"aboutMe",placeholder:"About Me"})})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("b",{children:"Contacts"}),": ",Object.keys(a.contacts).map((function(e){return(0,h.jsxs)("div",{children:[(0,h.jsx)(P,{contactTitle:e},e),(0,h.jsx)(j.gN,{placeholder:e,id:e,name:"contacts."+e})]},e)}))]})]})}})},k=function(e){var s=(0,l.useState)(!1),t=(0,u.Z)(s,2),i=t[0],n=t[1];if(!e.profile)return(0,h.jsx)(d.p,{});return(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{children:(0,h.jsx)("img",{src:"https://interier-foto.ru/wp-content/uploads/dlinnye-foto-4.jpg",width:"950px",alt:"photo"})}),(0,h.jsx)("h2",{children:e.profile.fullName}),(0,h.jsxs)("div",{className:c,children:[(0,h.jsx)("img",{src:e.profile.photos.large||f,alt:"userPhoto",height:"200px"}),e.isOwner&&(0,h.jsx)("input",{type:"file",onChange:function(s){var t;null!==(t=s.currentTarget.files)&&void 0!==t&&t.length&&e.savePhoto(s.currentTarget.files[0])}}),!i&&(0,h.jsx)(S,{profile:e.profile,setEditMode:function(){return n(!0)},isOwner:e.isOwner}),i&&(0,h.jsx)(g,{profile:e.profile,setEditMode:function(){return n(!1)}}),(0,h.jsx)(p,{status:e.status,updateStatus:e.updateStatus})]})]})},P=function(e){var s=e.contactTitle,t=e.contactValue;return(0,h.jsxs)("div",{children:[(0,h.jsx)("b",{children:s}),": ",t]})},S=function(e){return(0,h.jsxs)("div",{children:[e.isOwner&&(0,h.jsx)("button",{onClick:e.setEditMode,children:"edit"}),(0,h.jsxs)("div",{children:[(0,h.jsx)("b",{children:"Full name"}),": ",e.profile.fullName]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("b",{children:"Looking for a job"})," : ",e.profile.lookingForAJob?"yes":"no"]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("b",{children:"My professional skills"}),": ",e.profile.lookingForAJobDescription]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("b",{children:"About me"}),": ",e.profile.aboutMe]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("b",{children:"Contacts"}),": ",Object.keys(e.profile.contacts).map((function(s){return(0,h.jsx)(P,{contactTitle:s,contactValue:e.profile.contacts[s]},s)}))]})]})},y="MyPosts_postsBlock__lB-pf",w="MyPosts_posts__GSiZ2",N="Posts_item__jWd++",M=function(e){return(0,h.jsxs)("div",{className:N,children:[(0,h.jsx)("img",{src:"https://i.pinimg.com/originals/9c/77/46/9c7746225873e02d83b9315501b8dd2f.jpg",alt:"photo"}),e.message,(0,h.jsx)("div",{children:(0,h.jsxs)("span",{children:["like ",e.like]})})]})},_=t(6139),C=t(704),F=t(3079),I=t(1117),Z=(0,F.B)(10),A=l.memo((function(e){var s=e.addPost,t=e.posts;return(0,h.jsxs)("div",{className:y,children:["MyPosts",(0,h.jsx)(J,{onSubmit:function(e){s(e.newPostText)}}),(0,h.jsx)("div",{className:w,children:t.map((function(e){return(0,h.jsx)(M,{message:e.message,like:e.likesCount},e.id)}))})]})})),J=(0,C.Z)({form:"Posts"})((function(e){return(0,h.jsxs)("form",{onSubmit:e.handleSubmit,children:[(0,h.jsx)("div",{children:(0,h.jsx)(_.Z,{placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u043e\u0441\u0442",name:"newPostText",component:I.gx,validate:[F.C,Z]})}),(0,h.jsx)("div",{children:(0,h.jsx)("button",{children:"Add"})})]})})),O=(0,x.$j)((function(e){return{posts:e.profilePage.posts}}),(function(e){return{addPost:function(s){e((0,b.hB)(s))}}}))(A),T=function(e){return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(k,{profile:e.profile,status:e.status,updateStatus:e.updateStatus,isOwner:e.isOwner,savePhoto:e.savePhoto,saveProfile:e.saveProfile}),(0,h.jsx)(O,{})]})},B=t(9271),D=function(e){(0,r.Z)(t,e);var s=(0,o.Z)(t);function t(){return(0,i.Z)(this,t),s.apply(this,arguments)}return(0,n.Z)(t,[{key:"refreshProfile",value:function(){var e,s=this.props.match.params.userId;s||((s=null===(e=this.props.authorizedUserId)||void 0===e?void 0:e.toString())||this.props.history.push("/login"));s&&(this.props.getUserProfile(s),this.props.getStatus(s))}},{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(e,s,t){this.props.match.params.userId!==e.match.params.userId&&this.refreshProfile()}},{key:"render",value:function(){return(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(T,{profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus,isOwner:!this.props.match.params.userId,savePhoto:this.props.savePhoto,saveProfile:this.props.saveProfile})})}}]),t}(l.Component),E=(0,a.qC)((0,x.$j)((function(e){return{profile:e.profilePage.profile,status:e.profilePage.status,authorizedUserId:e.auth.userId}}),{getUserProfile:b.et,getStatus:b.lR,updateStatus:b.Nf,savePhoto:b.Ju,saveProfile:b.Ii}),B.EN)(D)}}]);
//# sourceMappingURL=498.3643d42b.chunk.js.map