package cn.jia.service;

import cn.jia.common.ServerResponse;

/**
 * Created by jia on 2017/12/5.
 */
public interface CollectionService {
    ServerResponse show(int userId, int pageIndex, int pageSize);
    ServerResponse cancelCollection(int id);
}
