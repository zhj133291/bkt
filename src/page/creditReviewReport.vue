<template>
  <div class="creditReview">
    <div class="company">
      <div class="co">{{content.GLOBAL.ENTNAME}}</div>
      <div class="time">报告所属期：<span class="red">{{content.GLOBAL.BGSJ}}</span></div>
    </div>
    <!--企业信息-->
    <div class="enterprise">
      <!--基本信息-->
      <div class="basicInfo">
        <div class="headline">1、企业信息</div>
        <div class="subtitle">1.1基本信息</div>
        <div class="info">
          <p>
            <label>工商注册号：</label><span>{{content.JBXX.REGNO}}</span>
          </p>
          <p>
            <label>组织机构代码：</label><span>{{content.JBXX.zzjgdm}}</span>
          </p>
        </div>
        <div class="info">
          <p>
            <label>纳税人识别号：</label><span>{{content.JBXX.nsrsbh}}</span>
          </p>
          <p>
            <label>统一社会信用代码：</label><span>{{content.JBXX.UNISCID}}</span>
          </p>
        </div>
        <div class="info">
          <p>
            <label>企业类型：</label><span>{{content.JBXX.ENTTYPE}}</span>
          </p>
          <p>
            <label>工商登记机关：</label><span>{{content.JBXX.REGORG}}</span>
          </p>
        </div>
        <div class="info">
          <p>
            <label>法定代表人：</label><span>{{content.JBXX.LEREP}}</span>
          </p>
          <p>
            <label>经营状态：</label><span>{{content.JBXX.REGSTATE}}</span>
          </p>
        </div>
        <div class="info">
          <p>
            <label>注册资本：</label><span>{{content.JBXX.REGCAP}}</span>
          </p>
        </div>
        <div class="info">
          <p style="width: 100%;">
            <label style="width: 15%;">注册地址：</label><span>{{content.JBXX.DOM}}</span>
          </p>
        </div>
        <div class="info">
          <p style="width: 100%;">
            <label style="width: 15%;">经营地址：</label><span>{{content.JBXX.SCJYDZ}}</span>
          </p>
        </div>
        <div class="info">
          <p>
            <label>成立日期：</label><span>{{content.JBXX.ESTDATE}}</span>
          </p>
          <p>
            <label>核准日期：</label><span>{{content.JBXX.APPRDATE}}</span>
          </p>
        </div>
        <div class="info">
          <p>
            <label>营业期限起：</label><span>{{content.JBXX.OPFROM}}</span>
          </p>
          <p>
            <label>营业期限至：</label><span>{{content.JBXX.OPTO}}</span>
          </p>
        </div>
        <div class="info">
          <p style="width: 100%;">
            <label style="width: 15%; float: left">经营范围：</label>
            <p style="width: 85%; float: right;">{{content.JBXX.OPSCOPE}}</p>
          </p>
        </div>
        <div class="info">
          <p>
            <label>一般纳税人资质：</label><span>{{content.JBXX.ybnsrzz}}</span>
          </p>
        </div>
      </div>
      <!--股东信息-->
      <div class="shareholderInfo">
        <div class="subtitle">1.2股东信息</div>
        <div class="shareholderTable">
          <el-table :data="content.LEGINFO" style="width: 100%">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="INV" label="股东名称"></el-table-column>
            <el-table-column prop="INVTYPE" label="股东类型"></el-table-column>
            <el-table-column prop="BLICTYPE" label="证照/证件类型"></el-table-column>
            <el-table-column prop="BLICNO" label="证照/证件号码"></el-table-column>
            <el-table-column prop="CGBL" label="持股比例"></el-table-column>
            <el-table-column prop="LISUBCONAM" label="累计认缴额"></el-table-column>
          </el-table>
        </div>
      </div>
      <!--高管信息-->
      <div class="executivesInfo">
        <div class="subtitle">1.3高管信息</div>
        <div class="executivesTable">
          <el-table :data="content.PERINFO" style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="NAME" label="名称"></el-table-column>
            <el-table-column prop="POSITION" label="职位"></el-table-column>
          </el-table>
        </div>
      </div>
      <!--票面银行信息-->
      <div class="ticketBankInfo">
        <div class="subtitle">1.4票面银行信息</div>
        <div class="ticketBankTable">
          <el-table :data="content.YHZH" style="width: 100%">
            <el-table-column type="index" label="序号" width="180"></el-table-column>
            <el-table-column prop="yhmc" label="开户银行"></el-table-column>
            <el-table-column prop="yhzh" label="银行账号"></el-table-column>
            <el-table-column prop="xxje" label="总金额"></el-table-column>
            <el-table-column prop="count" label="总分数"></el-table-column>
            <el-table-column prop="je_rate" label="金额占比"></el-table-column>
          </el-table>
        </div>
      </div>
      <!--签到信息-->
      <div class="signInfo">
        <div class="subtitle">1.5签到信息</div>
        <div class="tipInfo">
          设备类型：<span>{{content.QDXX.kpjList[0].sblx}}</span>， 设备代码：<span>{{content.QDXX.kpjList[0].kpjh}}</span>， 设备开票限额为：<span>{{content.QDXX.kpjList[0].kpxe}}</span>元, 设备：<span>{{content.QDXX.kpjList[0].zfjh}}</span>开票机,<br> 发行时间：
          <span>{{content.QDXX.kpjList[0].fxsj}}</span>， 认证时间：<span>{{content.QDXX.kpjList[0].rzsj}}</span>， 总共签到次数：<span>{{content.QDXX.kpjList[0].qdcsSum}}</span>次， 变更：<span>{{content.QDXX.kpjList[0].bgcsSum}}</span>次。
        </div>
        <div class="signTable">
          <el-table :data="content.QDXX.kpjList[0].qdxxList" style="width: 100%">
            <el-table-column prop="zzqdrq" label="最早签到日期"></el-table-column>
            <el-table-column prop="zwqdrq" label="最后签到日期"></el-table-column>
            <el-table-column prop="ip" label="IP地址"></el-table-column>
            <el-table-column prop="mac" label="MAC地址"></el-table-column>
            <el-table-column prop="cs" label="次数"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!--经营信息-->
    <div class="businessInfo">
      <div class="headline">2、经营信息</div>
      <div class="subtitle">2.1所属区域及行业</div>
      <div class="industry">
        <div>
          <p>所属省份:</p>
          <p>{{content.SSQYHY.provinceName}}</p>
          <p>所属市区:</p>
          <p>{{content.SSQYHY.cityName}}</p>
        </div>
        <div>
          <p>行业门类:</p>
          <p>{{content.SSQYHY.hyzlmc}}</p>
          <p>行业明细:</p>
          <p>{{content.SSQYHY.hymx}}</p>
        </div>
      </div>
      <div class="subtitle">2.2区域及行业排名</div>
      <div class="rankTable">
        <div class="QYHYPM">
          <div>
            <p>上年销售额</p>
            <p>上年全国销售额排名区间</p>
            <p>上年所属行业销售额排名区间</p>
          </div>
          <div>
            <p>{{content.QYHYPM.xxje}}</p>
            <p>{{content.QYHYPM.qypm}}</p>
            <p>{{content.QYHYPM.hypm}}</p>
          </div>
        </div>
      </div>
    </div>
    <!--经营风险-->
    <div class="businessRisk">
      <div class="headline">3、经营风险</div>
      <div class="subtitle">3.1采集发票数据统计</div>
      <div class="tipInfo">
        企业使用的设备：<span>{{content.QDXX.kpjlx}}</span>， 共有：<span>{{content.QDXX.kpj_count}}</span>台开票机， 已采集：<span>{{content.QDXX.fp_kpj_count}}</span>台开票机。
      </div>
      <div class="invoiceStatistics">
        <el-table :data="content.QYZTXX" style="width: 100%">
          <el-table-column prop="nsrmc" label="纳税人名称"></el-table-column>
          <el-table-column prop="nsrsbh" label="纳税人识别号"></el-table-column>
          <el-table-column prop="zzkprq" label="报告期内最早开票区间"></el-table-column>
          <el-table-column prop="zwkprq" label="报告期内最晚开票区间"></el-table-column>
          <el-table-column prop="fpfs" label="发票份数"></el-table-column>
        </el-table>
      </div>
      <div class="subtitle">3.2主营收入分析</div>
      <div class="title">3.2.1主营商品分子</div>
      <div class="tipInfo">
        采集时间区间：<span>{{content.ZYSPFX.cjqj}}</span><br> 发票份数（含商品明细）：
        <span>{{content.ZYSPFX.fpxxVo.fp_qdxx_count}}</span>份， 总金额：<span>{{content.ZYSPFX.fpxxVo.fp_qdxx_sum}}</span>元，占全部金额比例：<span>{{content.ZYSPFX.fpxxVo.fp_qdxx_sum_rate}}</span>。<br> 发票份数（无商品明细）：
        <span>{{content.ZYSPFX.fpxxVo.fp_count}}</span>份， 总金额：<span>{{content.ZYSPFX.fpxxVo.fp_sum}}</span>元，占全部金额比例：<span>{{content.ZYSPFX.fpxxVo.fp_sum_rate}}</span>。
      </div>
      <div class="tipInfo">
        该公司累计销售商品数为：<span>{{content.ZYSPFX.xx_sl}}</span>， 主营商品基尼系数为：<span>{{content.ZYSPFX.zysp_jnxs}}</span>，集中度：<span>{{content.ZYSPFX.jzd}}</span>。
      </div>
      <div class="mainProductAnalysis">
        <el-table :data="content.ZYSPFX.xx_spqd" style="width: 100%">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="mc" label="商品名称"></el-table-column>
          <el-table-column prop="xh" label="规格型号"></el-table-column>
          <el-table-column prop="dw" label="单位"></el-table-column>
          <el-table-column prop="je" label="销售金额"></el-table-column>
          <el-table-column prop="cs" label="次数"></el-table-column>
          <el-table-column prop="zb" label="金额占比"></el-table-column>
        </el-table>
      </div>
      <div class="title">3.2.2商品分类分析</div>
      <div class="tipInfo">
        在含有商品明细：<span>{{content.SPFLFX.qdmx_fpfs}}</span>份发票中：<br> 发票份数（含商品分类）：
        <span>{{content.SPFLFX.spfl_fpfs}}</span>份， 总金额：<span>{{content.SPFLFX.spfl_je}}</span>元，占全部金额比例：<span>{{content.SPFLFX.spfl_jerate}}</span>。<br> 发票份数（无商品分类）：
        <span>{{content.SPFLFX.unspfl_fpfs}}</span>份， 总金额：<span>{{content.SPFLFX.unspfl_je}}</span>元，占全部金额比例：<span>{{content.SPFLFX.unspfl_jerate}}</span>。
      </div>
      <div class="spflfx">
        <!-- <el-table :data="content.SPFLFX.spflList[0].spmx" border style="width: 100%; margin-top: 20px">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column prop="name" label="商品大类名称"></el-table-column>
          <el-table-column prop="amount1" label="商品小类名称"></el-table-column>
          <el-table-column prop="amount2" label="销售总额"></el-table-column>
          <el-table-column prop="amount3" label="次/份数"></el-table-column>
          <el-table-column prop="amount3" label="占全部比例"></el-table-column>
        </el-table> -->
      </div>
      <div class="title">3.2.3销项发票分析</div>
      <div class="triangle">发票数据统计</div>
      <div class="XXFPSJTJ">
        <el-table :data="content.XXFPSJTJ" style="width: 100%">
          <el-table-column prop="xfkpyf" label="日期"></el-table-column>
          <el-table-column prop="xxje" label="有效票金额"></el-table-column>
          <el-table-column prop="yxxxfps" label="有效票份数"></el-table-column>
          <el-table-column prop="zffpje" label="作废金额"></el-table-column>
          <el-table-column prop="zffps" label="作废份数"></el-table-column>
          <el-table-column prop="xx_hc" label="红冲金额"></el-table-column>
          <el-table-column prop="fs_xx_yxfps" label="红冲份数"></el-table-column>
        </el-table>
      </div>
      <div class="triangle">销项发票税率统计</div>
      <div class="XXFPSLTJ">
        <el-table :data="content.XXFPSLTJ" style="width: 100%">
          <el-table-column prop="kpyf" label="日期"></el-table-column>
          <el-table-column prop="d0" label="税率0%"></el-table-column>
          <el-table-column prop="d3" label="税率3%"></el-table-column>
          <el-table-column prop="d5" label="税率5%"></el-table-column>
          <el-table-column prop="d6" label="税率6%"></el-table-column>
          <el-table-column prop="d11" label="税率11%"></el-table-column>
          <el-table-column prop="d13" label="税率13%"></el-table-column>
          <el-table-column prop="d17" label="税率17%"></el-table-column>
          <el-table-column prop="dothers" label="一票多税率"></el-table-column>
        </el-table>
      </div>
      <div class="subtitle">3.3成本分析</div>
      <div class="title">3.3.1采购商品分析</div>
      <div class="tipInfo">
        采集时间区间：<span>{{content.CGSPFX.cjqj}}</span><br> 发票份数（含商品明细）：
        <span>{{content.CGSPFX.fpxxVo.fp_qdxx_count}}</span>份， 总金额：<span>{{content.CGSPFX.fpxxVo.fp_qdxx_sum}}</span>元，占全部金额比例：<span>{{content.CGSPFX.fpxxVo.fp_qdxx_sum_rate}}</span>。<br> 发票份数（无商品明细）：
        <span>{{content.CGSPFX.fpxxVo.fp_count}}</span>份， 总金额：<span>{{content.CGSPFX.fpxxVo.fp_sum}}</span>元，占全部金额比例：<span>{{content.CGSPFX.fpxxVo.fp_sum_rate}}</span>。
      </div>
      <div class="tipInfo">
        该公司累计销售商品数为：<span>{{content.CGSPFX.jx_sl}}</span>， 主营商品基尼系数为：<span>{{content.CGSPFX.cgsp_jnxs}}</span>，集中度：<span>{{content.CGSPFX.jzd}}</span>。
      </div>
      <div class="CGSPFX">
        <el-table :data="content.CGSPFX.jx_spqd" style="width: 100%">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="mc" label="商品名称"></el-table-column>
          <el-table-column prop="xh" label="规格型号"></el-table-column>
          <el-table-column prop="dw" label="单位"></el-table-column>
          <el-table-column prop="je" label="销售金额"></el-table-column>
          <el-table-column prop="cs" label="次数"></el-table-column>
          <el-table-column prop="zb" label="金额占比(%)"></el-table-column>
        </el-table>
      </div>
      <div class="title">3.3.2水费支出</div>
      <div class="SFZC">
        <el-table :data="content.SFZC" style="width: 100%">
          <el-table-column prop="kprq" label="开票日期"></el-table-column>
          <el-table-column prop="jse" label="金额"></el-table-column>
          <el-table-column prop="xfmc" label="水务供应商"></el-table-column>
        </el-table>
      </div>
      <div class="title">3.3.3电费支出</div>
      <div class="DFZC">
        <el-table :data="content.DFZC" style="width: 100%">
          <el-table-column prop="kprq" label="开票日期"></el-table-column>
          <el-table-column prop="jse" label="金额"></el-table-column>
          <el-table-column prop="xfmc" label="电力供应商"></el-table-column>
        </el-table>
      </div>
      <div class="title">3.3.4燃气支出</div>
      <div class="RQZC">
        <el-table :data="content.RQZC" style="width: 100%">
          <el-table-column prop="kprq" label="开票日期"></el-table-column>
          <el-table-column prop="jse" label="金额"></el-table-column>
          <el-table-column prop="xfmc" label="天然气供应商"></el-table-column>
        </el-table>
      </div>
      <div class="title">3.3.5热力支出</div>
      <div class="RLZC">
        <el-table :data="content.RLZC" style="width: 100%">
          <el-table-column prop="kprq" label="开票日期"></el-table-column>
          <el-table-column prop="jse" label="金额"></el-table-column>
          <el-table-column prop="xfmc" label="热力供应商"></el-table-column>
        </el-table>
      </div>
      <div class="title">3.3.6运输与仓储支出</div>
      <div class="YSJCC">
        <el-table :data="content.YSJCC" style="width: 100%">
          <el-table-column prop="kprq" label="开票日期"></el-table-column>
          <el-table-column prop="jse" label="金额"></el-table-column>
          <el-table-column prop="xfmc" label="运输与仓储供应商"></el-table-column>
        </el-table>
      </div>
      <div class="title">3.3.7物业支出</div>
      <div class="WYZC">
        <el-table :data="content.WYZC" style="width: 100%">
          <el-table-column prop="kprq" label="开票日期"></el-table-column>
          <el-table-column prop="jse" label="金额"></el-table-column>
          <el-table-column prop="xfmc" label="物业"></el-table-column>
        </el-table>
      </div>
      <div class="title">3.3.8进项发票</div>
      <div class="triangle">发票数据统计</div>
      <div class="JXFPSJTJ">
        <el-table :data="content.JXFPSJTJ" style="width: 100%">
          <el-table-column prop="gfkpyf" label="日期"></el-table-column>
          <el-table-column prop="jxje" label="有效发票金额"></el-table-column>
          <el-table-column prop="jxfps" label="有效发票份数"></el-table-column>
          <el-table-column prop="yxzpje" label="专用发票金额"></el-table-column>
          <el-table-column prop="yxzpfps" label="专用发票份数"></el-table-column>
          <el-table-column prop="yxppje" label="普通发票金额"></el-table-column>
          <el-table-column prop="yxppfps" label="普通发票份数"></el-table-column>
        </el-table>
      </div>
      <div class="subtitle">3.4上游企业汇总分析</div>
      <div class="tipInfo">
        该公司累计上游企业数量为：<span>{{content.QSDSYQY.syqytj.qysl}}</span>家，总交易金额约为：<span>{{content.QSDSYQY.syqytj.sumJe}}</span>元，平均交易金额约为：<span>{{content.QSDSYQY.syqytj.averageJe}}</span>元。
      </div>
      <div class="tipInfo">
        企业上游基尼系数为：<span>{{content.QSDSYQY.syqytj.syjnxs}}</span>，集中度<span>{{content.QSDSYQY.syqytj.syjzd}}</span>。
      </div>
      <div class="title">3.4.1前十大上游企业（10）</div>
      <div class="tipInfo">
        采集时间区间：<span>{{content.QSDSYQY.cjqj}}</span>。展示交易金额最多的前十大上游企业及占总交易金额的比例。
      </div>
      <div class="QSDSYQY">
        <el-table :data="content.QSDSYQY.sysdqy" style="width: 100%">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="qymc" label="企业名称"></el-table-column>
          <el-table-column prop="nsrsbh" label="纳税人识别号"></el-table-column>
          <el-table-column prop="dy" label="地域"></el-table-column>
          <el-table-column prop="zcsj" label="成立日期"></el-table-column>
          <el-table-column prop="djzclx" label="注册类型"></el-table-column>
          <el-table-column prop="zczb" label="注册资金"></el-table-column>
          <el-table-column prop="hy" label="所属行业"></el-table-column>
          <el-table-column prop="nsxydj" label="纳税信用等级"></el-table-column>
          <el-table-column prop="pjnd" label="评级年度"></el-table-column>
          <el-table-column prop="jebl" label="金额占比"></el-table-column>
          <el-table-column prop="fpfs" label="发票份数"></el-table-column>
          <el-table-column prop="jyje" label="总交易额"></el-table-column>
          <el-table-column prop="zhjyrq" label="最后交易日期"></el-table-column>
        </el-table>
      </div>
      <div class="title">3.4.2上游地域分布</div>
      <div class="SYDYFB">
        <el-table :data="content.SYDYFB" style="width: 100%">
          <el-table-column prop="dqmc" label="省份"></el-table-column>
          <el-table-column prop="jxje" label="金额"></el-table-column>
          <el-table-column prop="percent" label="金额占比"></el-table-column>
        </el-table>
      </div>
      <div class="title">3.4.3上游行业分布</div>
      <div class="SYHYFB">
        <el-table :data="content.SYHYFB" style="width: 100%">
          <el-table-column prop="hymc" label="行业类型"></el-table-column>
          <el-table-column prop="gysje" label="金额"></el-table-column>
          <el-table-column prop="percent" label="金额占比"></el-table-column>
        </el-table>
      </div>
      <div class="title">3.4.4上游类型分布</div>
      <div class="SYLXFB">
        <el-table :data="content.SYLXFB" style="width: 100%">
          <el-table-column prop="qylx_mc" label="企业类型"></el-table-column>
          <el-table-column prop="je" label="金额"></el-table-column>
          <el-table-column prop="zb" label="金额占比"></el-table-column>
        </el-table>
      </div>
      <div class="title">3.4.5上游年龄分布</div>
      <div class="SYNLFB">
        <el-table :data="content.SYNLFB" style="width: 100%">
          <el-table-column prop="nlfb_mc" label="年龄类型"></el-table-column>
          <el-table-column prop="je" label="金额"></el-table-column>
          <el-table-column prop="zb" label="金额占比"></el-table-column>
        </el-table>
      </div>
      <div class="subtitle">3.5下游企业汇总分析</div>
      <div class="tipInfo">
        该公司累计下游企业数量为：<span>{{content.QSDXYQY.xyqytj.qysl}}</span>家，总交易金额约为：<span>{{content.QSDXYQY.xyqytj.sumJe}}</span>元，平均交易金额约为：<span>{{content.QSDXYQY.xyqytj.averageJe}}</span>元；上游交易稳定指数：<span>{{content.QSDXYQY.xyqytj.xywdzs}}</span>，稳定度<span>{{content.QSDXYQY.xyqytj.xywdzsName}}</span>。
      </div>
      <div class="tipInfo">
        企业下游基尼系数为：<span>{{content.QSDXYQY.xyqytj.xyjnxs}}</span>，集中度<span>{{content.QSDXYQY.xyqytj.xyjzd}}</span>。
      </div>
      <div class="title">3.5.1前十大下游企业</div>
      <div class="tipInfo">
        采集区间：<span>{{content.QSDXYQY.cjqj}}</span>，展示交易金额最多的前十大下游企业及占总交易金额的比例。
      </div>
      <div class="QSDXYQY">
        <el-table :data="content.QSDXYQY.xysdqy" style="width: 100%">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="qymc" label="企业名称"></el-table-column>
          <el-table-column prop="nsrsbh" label="纳税人识别号"></el-table-column>
          <el-table-column prop="dy" label="地域"></el-table-column>
          <el-table-column prop="zcsj" label="成立日期"></el-table-column>
          <el-table-column prop="djzclx" label="注册类型"></el-table-column>
          <el-table-column prop="zczb" label="注册资金"></el-table-column>
          <el-table-column prop="hy" label="所属行业"></el-table-column>
          <el-table-column prop="nsxydj" label="纳税信用等级"></el-table-column>
          <el-table-column prop="pjnd" label="评级年度"></el-table-column>
          <el-table-column prop="jebl" label="金额占比"></el-table-column>
          <el-table-column prop="fpfs" label="发票份数"></el-table-column>
          <el-table-column prop="jyje" label="总交易额"></el-table-column>
          <el-table-column prop="zhjyrq" label="最后交易日期"></el-table-column>
        </el-table>
      </div>
      <div class="title">3.5.2下游地域分布</div>
      <div class="XYDYFB">
        <el-table :data="content.XYDYFB" style="width: 100%">
          <el-table-column prop="dqmc" label="省份"></el-table-column>
          <el-table-column prop="xxje" label="金额"></el-table-column>
          <el-table-column prop="percent" label="金额占比"></el-table-column>
        </el-table>
      </div>
      <div class="title">3.5.3下游行业分布</div>
      <div class="XYHYFB">
        <el-table :data="content.XYHYFB" style="width: 100%">
          <el-table-column prop="hymc" label="行业类型"></el-table-column>
          <el-table-column prop="khje" label="金额"></el-table-column>
          <el-table-column prop="percent" label="金额占比"></el-table-column>
        </el-table>
      </div>
      <div class="title">3.5.4下游类型分布</div>
      <div class="XYLXFB">
        <el-table :data="content.XYLXFB" style="width: 100%">
          <el-table-column prop="qylx_mc" label="企业类型"></el-table-column>
          <el-table-column prop="je" label="金额"></el-table-column>
          <el-table-column prop="zb" label="金额占比"></el-table-column>
        </el-table>
      </div>
      <div class="title">3.5.5下游年龄分布</div>
      <div class="XYNLFB">
        <el-table :data="content.XYNLFB" style="width: 100%">
          <el-table-column prop="nlfb_mc" label="年龄类型"></el-table-column>
          <el-table-column prop="je" label="金额"></el-table-column>
          <el-table-column prop="zb" label="金额占比"></el-table-column>
        </el-table>
      </div>
      <div class="modules">
        <div class="headline">4、抵质押信息</div>
        <div class="subtitle">4.1动产抵押信息</div>
        <div class="XYNLFB">
          <el-table :data="content.MORTINFO" style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="MORREGCNO" label="登记编号"></el-table-column>
            <el-table-column prop="PRICLASECAM" label="被担保债权数额"></el-table-column>
            <el-table-column prop="REGCAPCUR" label="币种"></el-table-column>
            <el-table-column prop="REGORG" label="登记机关"></el-table-column>
            <el-table-column prop="REGIDATE" label="登记日期"></el-table-column>
            <el-table-column prop="TYPE" label="状态"></el-table-column>
          </el-table>
        </div>
        <div class="subtitle">4.2股权出质信息</div>
        <div class="EQUINFO">
          <el-table :data="content.EQUINFO" style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="PLEDGOR" label="出质人"></el-table-column>
            <el-table-column prop="PLEDNO" label="出质人证照号码"></el-table-column>
            <el-table-column prop="BLICTYPE" label="质权人证照类型"></el-table-column>
            <el-table-column prop="BLICNO" label="质权人证照号码"></el-table-column>
            <el-table-column prop="PLEDAMUNIT" label="出质股权数额单位"></el-table-column>
            <el-table-column prop="IMPAM" label="出质股权数额"></el-table-column>
            <el-table-column prop="REGCAPCUR" label="出质股权数额币种"></el-table-column>
            <el-table-column prop="IMPORG" label="质权人"></el-table-column>
            <el-table-column prop="EQUPLEDATE" label="登记日期"></el-table-column>
            <el-table-column prop="EQUITYNO" label="股权登记编号"></el-table-column>
            <el-table-column prop="TYPE" label="状态"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="modules">
        <div class="headline">5、警示信息</div>
        <div class="subtitle">5.1税务信息</div>
        <div class="tipInfo">
          提示：若以下分类数据为零，不排除存在时间相对滞后或第三方未公示的情况，仅供客户参考。
        </div>
        <div class="title">5.1.1非正常用户信息</div>
        <div class="tipInfo">
          非正常户：是指已办理税务登记的纳税人未按照规定的期限申报纳税，在税务机关责令其期限改正后，逾期不改正的，并经税务机关派员实地检查，查无下落并且无法强制其履行纳税义务的纳税人。
        </div>
        <div class="FZCHXX">
          <el-table :data="content.FZCHXX" style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="rdrq" label="认定日期"></el-table-column>
            <el-table-column prop="zggsjg" label="认定机关"></el-table-column>
            <el-table-column prop="fbrq" label="发布日期"></el-table-column>
          </el-table>
        </div>
        <div class="title">5.1.2欠税信息</div>
        <div class="tipInfo">
          欠税：是指纳税人超过税收法律、行政法则规定期限或者纳税人超过税务机关依照税收法律、行政法规规定确定的纳税期限，未缴纳的税款，欠税发生后，税务机关应当依法催缴并严格按日计算加带滞金，直至采取税收保全、税收强制执行措施清缴欠税。
        </div>
        <div class="QSXX">
          <el-table :data="content.QSXX" style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="PUB_DATE" label="发布日期"></el-table-column>
            <el-table-column prop="NSRSBH" label="纳税人识别号"></el-table-column>
            <el-table-column prop="TYPE" label="欠税税种"></el-table-column>
            <el-table-column prop="OW_AMOUNT" label="当前发生的欠税额"></el-table-column>
            <el-table-column prop="OW_REMAIN" label="欠税余额"></el-table-column>
            <el-table-column prop="TAX_AUTHORITY" label="税务机关"></el-table-column>
          </el-table>
        </div>
        <div class="title">5.1.3重大税收违法</div>
        <div class="tipInfo">
          违法违章：纳税人违反税法或不遵守国家有关纳税人的规定而发生的违章行为
        </div>
        <div class="WFWZ">
          <el-table :data="content.WFWZ" style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="ajxz" label="案件性质"></el-table-column>
            <el-table-column prop="wfss" label="违法违章事实"></el-table-column>
            <el-table-column prop="yjcfqk" label="处理办法"></el-table-column>
            <el-table-column prop="sbrq" label="上报日期"></el-table-column>
            <el-table-column prop="zxgxrq" label="更新日期"></el-table-column>
          </el-table>
        </div>
        <div class="subtitle">5.2司法信息</div>
        <div class="tipInfo">
          提示：若以下分类数据为零，不排除存在时间相对滞后或第三方未公示的情况，仅供客户参考。
        </div>
        <div class="title">5.2.1执行公告</div>
        <div class="ZXGG">
          <el-table :data="content.ZXGG" style="width: 100%">
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="body" label="内容"></el-table-column>
            <el-table-column prop="court" label="法院名称"></el-table-column>
            <el-table-column prop="sortTime" label="立案时间"></el-table-column>
            <el-table-column prop="caseNo" label="案号"></el-table-column>
            <el-table-column prop="caseState" label="案件状态"></el-table-column>
          </el-table>
        </div>
        <div class="title">5.2.2失信公告</div>
        <div class="SXGG">
          <el-table :data="content.SXGG" style="width: 100%">
            <el-table-column prop="court" label="执行法院名称"></el-table-column>
            <el-table-column prop="yjdw" label="做出执行依据单位"></el-table-column>
            <el-table-column prop="lxqk" label="被执行人履行情况"></el-table-column>
            <el-table-column prop="sortTime" label="立案时间"></el-table-column>
            <el-table-column prop="caseNo" label="案号"></el-table-column>
            <el-table-column prop="postTime" label="发布时间"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="modules">
        <div class="headline">6、爱信诺指数</div>
        <div class="subtitle">6.1成长指数</div>
        <div class="IXNZS">
          <div>
            <p style="width: 15%;">成长指数</p>
            <p style="width: 78%;">{{content.IXNZS.czzs}}</p>
          </div>
          <div>
            <p style="width: 15%;">描述</p>
            <p style="width: 78%;">通过预测企业未来一段时间的销售增长情况，评估企业未来一段时间经营状态，反映企业持续成长的能力。（成长指数越高企业成长能力越强）</p>
          </div>
        </div>
        <div class="subtitle">6.2履约指数</div>
        <div class="IXNZS">
          <div>
            <p style="width: 15%;">履约指数</p>
            <p style="width: 78%;">{{content.IXNZS.wyzs}}</p>
          </div>
          <div>
            <p style="width: 15%;">描述</p>
            <p style="width: 78%;">通过分析企业历史履约情况，从而评估企业未来履约的可能性，反映企业信用风险程度。（履约指数越高企业履约能力越强）</p>
          </div>
        </div>
      </div>
      <div class="modules">
        <div class="headline">7、联系方式</div>
        <div class="lxrList">
          <el-table :data="content.lxrList" style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="gddh" label="联系方式"></el-table-column>
            <el-table-column prop="mc" label="联系人"></el-table-column>
            <el-table-column prop="type" label="联系人类型"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        headers: {
          client: '1',
          userId: '',
          token: ''
        },
        "content": {
          "SYNLFB": [{
              "je": "",
              "zb": "",
              "nlfb_mc": ""
            }
          ],
          "QSXX": [{
            "NSRSBH": "",
            "OW_AMOUNT": "",
            "PUB_DATE": "",
            "OW_REMAIN": "",
            "TAX_AUTHORITY": "",
            "TYPE": ""
          }],
          "JXFPSJTJ": [{
              "yxzpje": "",
              "yxppfps": "",
              "gfkpyf": "",
              "jxfps": "",
              "yxppje": "",
              "jxje": "",
              "yxzpfps": ""
            },
          ],
          "IXNZS": {
            "wyzs": '',
            "czzs": ''
          },
          "DFZC": [{
            "kprq": "",
            "jse": "",
            "xfmc": ""
          }],
          "CGSPFX": {
            "cgsp_jnxs": "",
            "jx_sl": "",
            "jx_spqd": [{
                "je": "",
                "xh": "",
                "dw": "",
                "zb": "",
                "mc": "",
                "cs": ""
              }
            ],
            "cjqj": "",
            "jzd": "",
            "fpxxVo": {
              "fp_count": "",
              "fp_sum_rate": "",
              "fp_qdxx_count": "",
              "fp_qdxx_sum_rate": "",
              "fp_sum": "",
              "fp_qdxx_sum": ""
            }
          },
          "LEGINFO": [{
              "CONFORM": "",
              "INVTYPE": '',
              "LIACCONAM": "",
              "BLICNO": '',
              "BLICTYPE": '',
              "INV": "",
              "CGBL": "",
              "LISUBCONAM": ""
            }
          ],
          "QDXX": {
            "kpjlx": "",
            "fp_kpj_count": "",
            "kpjList": [{
              "bgcsSum": '',
              "qdcsSum": '',
              "zfjh": "",
              "rzsj": "",
              "fxsj": "",
              "kpjh": "",
              "qdxxList": [{
                "mac": "",
                "zzqdrq": "",
                "zwqdrq": "",
                "cs": "",
                "ip": ""
              }],
              "sblx": "",
              "kpxe": ""
            }],
            "kpj_count": ""
          },
          "XXFPSJTJ": [{
              "zffps": "",
              "zffpje": "",
              "xx_hc": "",
              "xxje": "",
              "yxxxfps": "",
              "xfkpyf": "",
              "fs_xx_yxfps": ""
            }
          ],
          "SYDYFB": [{
              "dqmc": "",
              "percent": "",
              "jxje": ""
            }
          ],
          "MORTINFO": [{
            "REGIDATE": "",
            "PRICLASECAM": "",
            "TYPE": "",
            "REGORG": "",
            "REGCAPCUR": "",
            "MORREGCNO": ""
          }],
          "ZYSPFX": {
            "xx_spqd": [{
                "je": "",
                "xh": "",
                "dw": "",
                "zb": "",
                "mc": "",
                "cs": ""
              }
            ],
            "xx_sl": "",
            "cjqj": "",
            "jzd": "",
            "zysp_jnxs": "",
            "fpxxVo": {
              "fp_count": "",
              "fp_sum_rate": "",
              "fp_qdxx_count": "",
              "fp_qdxx_sum_rate": "",
              "fp_sum": "",
              "fp_qdxx_sum": ""
            }
          },
          "RLZC": [{
            "kprq": "",
            "jse": "",
            "xfmc": ""
          }],
          "PERINFO": [{
            "POSITION": "",
            "NAME": ""
          }],
          "JBXX": {
            "REGCAP": "",
            "zzjgdm": "",
            "nsrsbh": "",
            "ESTDATE": "",
            "UNISCID": "",
            "OPTO": "",
            "ENTTYPE": "",
            "SCJYDZ": "",
            "REGSTATE": "",
            "REGNO": "",
            "DOM": "",
            "APPRDATE": "",
            "LEREP": "",
            "OPSCOPE": "",
            "ybnsrzz": "",
            "REGORG": "",
            "OPFROM": ""
          },
          "EQUINFO": [{
            "IMPAM": "",
            "PLEDGOR": "",
            "PLEDNO": "",
            "BLICNO": "",
            "IMPORG": "",
            "TYPE": "",
            "EQUPLEDATE": ""
          }],
          "XYDYFB": [{
              "dqmc": "",
              "percent": "",
              "xxje": ""
            }
          ],
          "SYLXFB": [{
              "je": "",
              "zb": "",
              "qylx_mc": ""
            }
          ],
          "JXFPSLTJ": [{
              "d0": "",
              "d11": "",
              "d13": "",
              "d3": "",
              "d5": "",
              "dothers": "",
              "kpyf": "",
              "d17": "",
              "d6": ""
            }
          ],
          "ZXGG": [{
            "body": "",
            "execMoney": '',
            "caseState": "",
            "court": "",
            "sortTime": "",
            "dataType": "",
            "zxggId": "",
            "title": "",
            "sortTimeString": "",
            "caseNo": "",
            "status": '',
            "pname": "",
            "idcardNo": ""
          }],
          "XYHYFB": [{
              "hymc": "",
              "percent": "",
              "khje": ""
            }
          ],
          "XXFPSLTJ": [{
              "d0": "",
              "d11": "",
              "d13": "",
              "d3": "",
              "d5": "",
              "dothers": "",
              "kpyf": "",
              "d17": "",
              "d6": ""
            }
          ],
          "SFZC": [{
            "kprq": "",
            "jse": "",
            "xfmc": ""
          }],
          "QSDSYQY": {
            "cjqj": "",
            "sysdqy": [{
                "pjnd": "",
                "zczb": "",
                "jyje": "",
                "nsxydj": "",
                "nsrsbh": "",
                "dy": "",
                "qymc": "",
                "djzclx": "",
                "zcsj": "",
                "hy": "",
                "jebl": "",
                "zhjyrq": "",
                "fpfs": ""
              }
            ],
            "syqytj": {
              "syjzd": "",
              "averageJe": "",
              "sumJe": "",
              "syjnxs": "",
              "qysl": ""
            }
          },
          "QYHYPM": {
            "qypm": "",
            "hypm": "",
            "xxje": ""
          },
          "lxrList": [{
            "mc": "",
            "gddh": "",
            "type": ""
          }],
          "SXGG": [{
            "body": "",
            "lxqk": "",
            "yiwu": "",
            "court": "",
            "yjdw": "",
            "postTime": "",
            "dataType": "",
            "province": "",
            "age": '',
            "sortTime": "",
            "sortTimeString": "",
            "caseNo": "",
            "jtqx": "",
            "pname": "",
            "yjCode": "",
            "sxggId": '',
            "sex": "",
            "idcardNo": ""
          }],
          "ALL": {
            "sxggCount": "",
            "zxggCount": ""
          },
          "XYNLFB": [{
              "je": "",
              "zb": "",
              "nlfb_mc": ""
            }
          ],
          "QSDXYQY": {
            "xysdqy": [{
                "pjnd": "",
                "zczb": "",
                "jyje": "",
                "nsxydj": "",
                "nsrsbh": "",
                "dy": "",
                "qymc": "",
                "djzclx": "",
                "zcsj": "",
                "hy": "",
                "jebl": "",
                "zhjyrq": "",
                "fpfs": ""
              }
            ],
            "cjqj": "",
            "xyqytj": {
              "xyjnxs": "",
              "xywdzsName": "",
              "xyjzd": "",
              "averageJe": "",
              "sumJe": "",
              "xywdzs": "",
              "qysl": ""
            }
          },
          "YHZH": [{
            "yhzh": "",
            "count": "",
            "yhmc": "",
            "xxje": "",
            "je_rate": ""
          }],
          "WFWZ": [{
            "ajxz": "",
            "wfss": "",
            "yjcfqk": "",
            "sbrq": "",
            "zxgxrq": ""
          }],
          "QYZTXX": [{
            "nsrsbh": "",
            "nsrmc": "",
            "zwkprq": "",
            "fpfs": "",
            "zzkprq": ""
          }],
          "FZCHXX": [{
            "zggsjg": "",
            "rdrq": "",
            "fbrq": ""
          }],
          "SSQYHY": {
            "hyzlmc": "",
            "cityName": "",
            "hymx": "",
            "provinceName": ""
          },
          "XYLXFB": [{
              "je": "",
              "zb": "",
              "qylx_mc": ""
            }
          ],
          "GLOBAL": {
            "REPORTNAME": "",
            "VERSION": "",
            "IXINNUOBM": "",
            "ENTNAME": "",
            "JYLSH": '',
            "BGSJ": ""
          },
          "SPFLFX": {
            "spflList": [{
              "spmx": [{
                "je": "",
                "xlmc": "",
                "bl": "",
                "qdfs": "",
                "fpfs": ""
              }],
              "spdl": ""
            }],
            "qdmx_fpfs": "",
            "spfl_fpfs": "",
            "spfl_je": "",
            "unspfl_je": "",
            "unspfl_jerate": "",
            "spfl_jerate": "",
            "unspfl_fpfs": ""
          },
          "RQZC": [{
            "kprq": "",
            "jse": "",
            "xfmc": ""
          }],
          "WYZC": [{
            "kprq": "",
            "jse": "",
            "xfmc": ""
          }],
          "YSJCC": [{
            "kprq": "",
            "jse": "",
            "xfmc": ""
          }],
          "SYHYFB": [{
              "hymc": "",
              "gysje": "",
              "percent": ""
            }
          ]
        },
        "operationTime": "",
        "id": ""

      }
    },
    created() {
      let data = {
        "service": "reportService",
        "method": "getSdReport",
        "data": {
          enterpriseName: '宁海县轩敏印刷厂',
          type: 2
        }
      };
      this.$api.post('', data, this.getReportSuc, this.getReportErr, this.headers);
    },
    methods: {
      getReportSuc(data) {
        this.content = data.content;
        console.log(this.content.GLOBAL);
      },
      getReportErr(data) {
        console.log(data);
      }
    }
  };
</script>

<style lang="stylus" scope rel="stylesheet/stylus">
  .headline{
    background: #C7CEDB;
    font-weight: 700;
    color: #2D2D2D;
    font-size: 20px;
    padding: 10px;
  }
  .modules{
    margin: 15px 0;
  }
  .subtitle{
    color: #2D2D2D;
    font-size: 16px;
    padding: 15px 10px 5px 10px;
    margin-bottom: 15px;
    border-bottom: 3px solid #C7CEDB;
    position: relative;
    &:after{
       content: '';
       width: 180px;
       height: 3px;
       background: #FF0001;
       position: absolute;
       left: 0;
       bottom: -3px;
    }
  }
  .title{
    color: #2d2d2d;
    font-size: 15px;
    padding: 15px 10px;
  }
  .triangle {
    content: '';
    height: 0;
    line-height: 0;
    padding-left: 10px;
    margin: 10px;
    border-top: 8px solid transparent;
    border-right: medium none;
    border-bottom: 8px solid transparent;
    border-left: 10px solid #555;
  }
  .creditReview{
    font-size: 14px;
    margin: 20px;
    .company{
      .co{
        font-size: 24px;
        font-weight: 400;
        padding: 15px 10px;
      }
      .time{
        font-size 16px;
        color: rgb(91, 110, 130);
        padding: 10px;
        .red{
          color: #FF0001;
        }
      }

    }
    .enterprise{
      .basicInfo{
        .info{
          display: inline-block;
          width: 100%;
          font-size: 15px;
          padding: 20px 0;
          p{
            width: 50%;
            float: left;
            label{
              width: 30%;
              display: inline-block;
              color: #8E8E8E;
            }
          }
        }
      }
    }
    .tipInfo{
      border:2px solid #D2A158;
      background: #FDF7E0;
      padding: 15px;
      margin-bottom: 15px;
      line-height: 24px;
      color: #C55B01;
      span {
        color: #FF0001;
        font-size: 18px;
      }
    }
    .businessInfo{
      margin: 15px 0;
    }
    .industry{
      background: #fff;
      margin: 15px 0;
      div{
        width: 100%;
        border-bottom: 1px solid #e8e8e8;
        display: inline-block;
        &:last-child{
           border-bottom: none;
        }
        p{
          display: inline-block;
          width: 23%;
          padding: 10px 5px;
          border-left: 1px solid #e8e8e8;
          float: left;
        }
      }
    }
    .QYHYPM{
      background: #fff;
      margin: 15px 0;
      div{
        width: 100%;
        border-bottom: 1px solid #e8e8e8;
        display: inline-block;
        &:last-child{
           border-bottom: none;
        }
        p{
          display: inline-block;
          width: 30%;
          padding: 10px 5px;
          border-left: 1px solid #e8e8e8;
          float: left;
        }
      }
    }
    .IXNZS{
      background: #fff;
      margin: 15px 0;
      div{
        width: 100%;
        border-bottom: 1px solid #e8e8e8;
        display: inline-block;
        &:last-child{
           border-bottom: none;
        }
        p{
          display: inline-block;
          padding: 10px 5px;
          border-left: 1px solid #e8e8e8;
          float: left;
        }
      }
    }
  }
</style>
