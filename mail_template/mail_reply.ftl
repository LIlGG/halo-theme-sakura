
<#global res_base_url = settings.cdn?then("//cdn.jsdelivr.net/gh/LIlGG/halo-theme-sakura@1.3.1", theme_base)/>
<div style="background: white;
      width: 95%;
      max-width: 800px;
      margin: auto auto;
      border-radius: 5px;
      border:orange 1px solid;
      overflow: hidden;
      -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12);
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.18);">
    <header style="overflow: hidden;">
        <img style="width:100%;z-index: 666;" src="${settings.reply_mail_img!'${res_base_url!}/source/images/other/head.jpg'}">
    </header>
    <div style="padding: 5px 20px;">
        <p style="position: relative;
        color: white;
        float: left;
        z-index: 999;
        background: orange;
        padding: 5px 30px;
        margin: -25px auto 0 ;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.30)">Dear ${baseAuthor!}</p>
        <br>
        <h3 class="i18n" data-iname="mail.title">您有一条来自<a style="text-decoration: none;color: orange " target="_blank" href="${blog_url!}" rel="noopener">${blog_title!}</a>的回复</h3>
        <br>
        <p style="font-size: 14px;">您在文章《${pageTitle!}》上发表的评论：</p>
        <p style="border-bottom:#ddd 1px solid;border-left:#ddd 1px solid;padding-bottom:20px;background-color:#eee;margin:15px 0px;padding-left:20px;padding-right:20px;border-top:#ddd 1px solid;border-right:#ddd 1px solid;padding-top:20px">${baseContent!}</p>
        <p style="font-size: 14px;">${replyAuthor!} 给您的回复如下：</p>
        <p style="border-bottom:#ddd 1px solid;border-left:#ddd 1px solid;padding-bottom:20px;background-color:#eee;margin:15px 0px;padding-left:20px;padding-right:20px;border-top:#ddd 1px solid;border-right:#ddd 1px solid;padding-top:20px">${replyContent!}</p>
        <p style="font-size: 14px;">
            <a style="text-decoration: none;color: orange" target="_blank" href="${blog_url!}" rel="noopener">${user.nickname!}</a>&nbsp;双手呈上~
        </p>
        <div style="text-align: center;">
          <img src="${res_base_url!}/source/images/other/hr.png" style="width:100%;margin:5px auto 5px auto; display: block;">
          <a style="text-transform: uppercase;
                      text-decoration: none;
                      font-size: 14px;
                      border: 2px solid #6c7575;
                      color: #2f3333;
                      padding: 10px;
                      display: inline-block;
                      margin: 10px auto 0; " target="_blank" href="${pageFullPath!}" rel="noopener">点击查看回复的完整內容</a>
       </div>
       <p style="font-size: 12px;text-align: center;color: #999;">本邮件为系统自动发出，请勿直接回复<br>
        © ${.now?string("yyyy")} ${(user.nickname)!}
       </p>
    </div>
</div>